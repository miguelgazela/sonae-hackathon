<?php
    header('Content-Type: application/json');
    
    include_once('../../common/init.php');
    include_once('../../database/listas.php');

    if(!isset($_GET['iduser'])) {
            return "Error! UsernameID not set";
        }

    return json_encode(getListas($_GET['iduser']));
?>