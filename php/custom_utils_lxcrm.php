<?php
function lxlog($obj, $append = 1)
{
    ob_start();
    echo print_r($obj,true);
    $o = ob_get_clean();
    if($append == 1){
        $current = file_get_contents("./lx.log");
        $o = $current."\n".$o;
    }
    file_put_contents("./lx.log",$o);
    //***** Este es el toque de MaTT luego lo hacemos fumar
    //error_log(print_r($bean_fetched_row,1),3,"/tmp/error_log");
}
