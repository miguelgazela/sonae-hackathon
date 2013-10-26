<?php
    header('Content-Type: application/json');
    
    include_once('../../common/init.php');
    include_once('../../database/listas.php');

    if(!isset($_GET['idlista'])) {
            return "Error! UsernameID not set";
        }
    if(!isset($_GET['idproduto'])) {
            return "Error! UsernameID not set";
        }

    return json_encode(removeProduto($_GET['idlista'],$_GET['idproduto']));
?>