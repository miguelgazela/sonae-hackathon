<?php
    header('Content-Type: application/json');
    
    include_once('../../common/init.php');
    include_once('../../database/listas.php');

    if(!isset($_GET['name'])) {
            return "Error! UsernameID not set";
        }
    if(!isset($_GET['iduser'])) {
            return "Error! UsernameID not set";
        }

    return json_encode(createLista($_GET['name'],$_GET['iduser']));
?>