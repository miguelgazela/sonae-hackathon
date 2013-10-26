<?php 
    include_once('../../common/init.php');
    include_once('../../database/favoritos.php');

    if(!isset($_GET['iduser'])) {
        die();
    }
    if(!isset($_GET['idproduto'])) {
        die();
    }
    
    add($_GET['iduser'], $_GET['idproduto']);
?>