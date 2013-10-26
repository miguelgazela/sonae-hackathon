<?php 
    header('Content-Type: application/json');
    include_once('../../common/init.php');
    include_once('../../database/favoritos.php');

    if(!isset($_GET['iduser'])) {
            return "Error! Username not set";
        }
    if(!isset($_GET['idproduto'])) {
            return "Error! Produto not set";
        }

    return json_encode(add($_GET['iduser'],$_GET['idproduto']));
?>