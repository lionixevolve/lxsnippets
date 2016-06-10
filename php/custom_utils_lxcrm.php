<?php

function lxlog($obj, $append = 1)
{
    ob_start();
    echo print_r($obj, true);
    $o = ob_get_clean();
    if ($append == 1) {
        $current = file_get_contents('./lx.log');
        $o = $current."\n".$o;
    }
    file_put_contents('./lx.log', $o);
    //***** Este es el toque de MaTT luego lo hacemos fumar
    //error_log(print_r($bean_fetched_row,1),3,"/tmp/error_log");
}

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

    return false;
}
