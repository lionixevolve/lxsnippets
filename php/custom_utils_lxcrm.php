<?php

function lxlog($obj, $file = __FILE__, $line = __LINE__, $func = __FUNCTION__, $append = 1)
{
    /* lxlog function is intended for temporal use only, during development stage, so, is subject of changes without further notice
    * http://php.net/manual/en/language.constants.predefined.php
    * http://www.php.net/manual/en/functions.arguments.php
    */
    $o = "*** Current lxlog first line ***\n";
    $o .= 'Date     : '.date('Y-m-d H:i:s')."\n";
    $o .= 'File     : '.$file."\n";
    $o .= 'Line     : '.$line."\n";
    $o .= 'Function : '.$func."\n";
    $o .= "Object   :\n";
    ob_start();
    echo print_r($obj, true);
    $o .= ob_get_clean();
    $o .= "\n*** Current lxlog call last line ***\n";
    if ($append == 1) {
        file_put_contents('./lx.log', $o, FILE_APPEND);
    } else {
        file_put_contents('./lx.log', $o);
    }
    //***** Este es el toque de MaTT luego lo hacemos fumar
    //error_log(print_r($bean_fetched_row,1),3,"/tmp/error_log");
} //fin lxlog

function getRelationshipByModules($m1, $m2)
{
    global $db,$dictionary,$beanList;
    $rel = new Relationship();
    if ($rel_info = $rel->retrieve_by_sides($m1, $m2, $db)) {
        $bean = BeanFactory::getBean($m1);
        $rel_name = $rel_info['relationship_name'];
        foreach ($bean->field_defs as $field => $def) {
            if (isset($def['relationship']) && $def['relationship'] == $rel_name) {
                return array('relationship' => $def['name'], 'module' => $m1);
            }
        }
    } elseif ($rel_info = $rel->retrieve_by_sides($m2, $m1, $db)) {
        $bean = BeanFactory::getBean($m2);
        $rel_name = $rel_info['relationship_name'];
        foreach ($bean->field_defs as $field => $def) {
            if (isset($def['relationship']) && $def['relationship'] == $rel_name) {
                return array('relationship' => $def['name'], 'module' => $m2);
            }
        }
    }

    return array('relationship' => "Not found a relationship between {$m1} and {$m2}", 'module' => 'none');
}

/*
 * This function send a email from crm
 * */

function lxSendEmail2($dataMail)
{
    include_once 'include/SugarPHPMailer.php';
    include_once 'include/utils/db_utils.php'; // for from_html function
    global $db, $sugar_config, $current_user;
    $query = "select id, name from email_templates where name = '".$dataMail['template']."';";
    $results = $db->query($query);
    $idTemplate = '';
    while ($row = $db->fetchByAssoc($results)) {
        $idTemplate = $row['id'];
    }
    $emailtemplate = new EmailTemplate();
    if ($idTemplate != '') {
        $emailtemplate->retrieve($idTemplate);
        $emailtemplate->subject = from_html($emailtemplate->subject);
        $emailtemplate->body_html = from_html($emailtemplate->body_html);
        $emailtemplate->body = from_html($emailtemplate->body);

        if ($dataMail['replaceBody']) {
            $emailtemplate->body_html = str_replace('{{maincontent}}', $dataMail['body'], $emailtemplate->body_html);
        }

        if ($dataMail['replaceSubject']) {
            $emailtemplate->subject = from_html($dataMail['subject']);
        }
    }

    $mail = new SugarPHPMailer();
    $mail->IsHTML(true);
    if ($idTemplate != '' && isset($emailtemplate->text_only) && $emailtemplate->text_only) {
        $this->description_html = '';
        $mail->IsHTML(false);
    }
    $mail->Sender = $dataMail['sender'];
    $mail->From = $dataMail['from'];
    $mail->ClearAllRecipients();
    $mail->ClearReplyTos();
    $mail->FromName = $dataMail['fromName'];
    $mail->Subject = ($idTemplate != '') ? $emailtemplate->subject : $dataMail['subject'];
    $mail->Body = ($idTemplate != '') ? $emailtemplate->body_html : $dataMail['body'];

    if (count($dataMail['toEmails']) <= 0) {
        return 0;
    }
    foreach ($dataMail['toEmails'] as $email) {
        $mail->AddAddress($email);
    }
    $mail->prepForOutbound();
    $mail->setMailerForSystem();
    $success = $mail->Send();
    if (!$success) {
        error_log('Email failed to send. '.$mail->ErrorInfo);

        return 0;
    }

    createEmailsBeans($mail, $dataMail);

    /*registrar mail, de dnd saco al dueno assigned usr ir,
    $mail=new Emails();
     */

    return 1;
}

function createEmailsBeans($mail, $dataMail)
{
    $db = DBManagerFactory::getInstance();

    //$result=$db->query($q, true, 'FAILD' );
    //$r=array();
    //while(($row= $db->fetchByAssoc($result))){
//        $r[]=$row;
//    }

//----------------------------------------------------------------------------------------------------
    // 1ero se busca el bean id y el bean module de cada email,
    //en caso de que un contacto , lead o account
    //tengan el mismo email se tomara el mas reciente por fecha
    //entiendade email como la instancia del obj Email()

    $arrEmails = array();
    foreach ($dataMail['toEmails'] as $email) {
        $obj = array();
        $obj['conBean'] = 0;
        $obj['address'] = $email;
        $obj['beanId'] = '';
        $obj['beanModule'] = '';
        $obj['emailId'] = '-1';
        $obj['addressId'] = '-1';

        $qry0 = "SELECT
                 b.id as addressId, a.bean_id ,  a.bean_module,b.date_created
                FROM
                    email_addr_bean_rel a inner join
                    email_addresses b on a.email_address_id=b.id
                WHERE
            a.deleted=0
            AND b.deleted=0
            AND b.email_address='".$email."'
            ORDER BY a.date_created asc, bean_module";
        $result = $db->query($qry0);
        while (($row = $db->fetchByAssoc($result)) != null) {
            $obj['conBean'] = 1;
            $obj['addressId'] = $row['addressId'];
            $obj['beanId'] = $row['bean_id'];
            $obj['beanModule'] = $row['bean_module'];
        }
        $arrEmails[] = $obj;
    }

//----------------------------------------------------------------------------------------------------
// 2do Se crearn los registros de EMAILS por cada direccion de correo, relacionandolos con los beans correctos

    foreach ($arrEmails as &$objBean) {
        if ($objBean['conBean'] == 1) {
            $mail2 = new Email();
            $mail2->save();
            $mail2->assigned_user_id = 2;
            $mail2->modified_user_id = 2;
            $mail2->created_by = 2;
            $mail2->deleted = 0;
            $mail2->date_sent = $mail2->date_entered;
            $mail2->name = $mail->Subject;
            $mail2->type = 'out';
            $mail2->status = 'sent';
            $mail2->falgged = 0;
            $mail2->reply_to_status = 0;
            $mail2->intent = 'pick';
            $mail2->parent_id = $objBean['beanId'];
            $mail2->parent_type = $objBean['beanModule'];
            $mail2->save();
            $objBean['emailId'] = ''.$mail2->id;
        }
    }

//----------------------------------------------------------------------------------------------------
//3ro Se inserta el email de envio (from) de los emails ya creados
//optenemos el email del usuario id=2 primero

    $objUser = array();
    $objUser['id'] = -1;
    $objUser['email_address'] = '';

    $query2 = "SELECT b.id,b.email_address
        FROM email_addr_bean_rel a inner join email_addresses b on a.email_address_id=b.id
        WHERE a.deleted=0 AND a.bean_id='2';";
    $result = $db->query($query2);
    while (($row = $db->fetchByAssoc($result)) != null) {
        $objUser['addressId'] = $row['id'];
        $objUser['email_address'] = $row['email_address'];
    }

    if ($objUser['addressId'] == -1) {
        return 'ERROR:USER ID 2 IS NOT CONFIGURED';
    }
//...
// ahora se inserta en emails_email_addr_rel, para todos los emails creados el usuario q envia
// es decir usuario id=2

//lxlog('',0);

    foreach ($arrEmails as &$objBean) {
        //      lxlog($objBean,1);
        if ($objBean['conBean'] == 1) {
            $queryInsert3 = "insert into emails_email_addr_rel
                                                          (id,
                                                           email_id,
                                                           address_type,
                                                           email_address_id,
                                                           deleted)
                                                           values
                                                           (
                                                           uuid(),
                                                           '".$objBean['emailId']."',
                                                           'from',
                                                           '".$objUser['addressId']."',
                                                           0
                                                           );";

            $result = $db->query($queryInsert3);
        }
    }

//----------------------------------------------------------------------------------------------------
//4to, se insertan en emails_email_addr_rel los TO de los emails ya creados

    foreach ($arrEmails as &$objBean) {
        if ($objBean['conBean'] == 1) {
            $queryInsert2 = "insert into emails_email_addr_rel
                                                      (id,
                                                       email_id,
                                                       address_type,
                                                       email_address_id,
                                                       deleted)
                                                       values
                                                       (
                                                       uuid(),
                                                       '".$objBean['emailId']."',
                                                       'to',
                                                       '".$objBean['addressId']."',
                                                       0
                                                       );";
            $result = $db->query($queryInsert2);
        }
    }

//----------------------------------------------------------------------------------------------------
//5to se inserta el cuerpo de los emails en emails_text por cada email creado
//lxlog($mail->Body,0);
    foreach ($arrEmails as &$objBean) {
        if ($objBean['conBean'] == 1) {
            $queryInsert4 = "insert into emails_text(
                                                  email_id,
                                                  from_addr,
                                                  to_addrs,
                                                  description,
                                                  description_html,
                                                  deleted)values
                                                  (
                                                 '".$objBean['emailId']."',
                                                 '".$objUser['email_address']."',
                                                 '".$objBean['address']."',
                                                 '".html2text($mail->Body)."',
                                                 '".html2text($mail->Body)."',
                                                 0
                                                  );";
            //...
            $qd = "delete from emails_text where email_id='".$objBean['emailId']."'";
            //Parche necesario para insertar correctamente los datos en emails_text
            $result = $db->query($qd);
            $result = $db->query($queryInsert4);
        }
    }

//Listo, los emails se enviaron y se registraron correctamente

    return 1;
}
