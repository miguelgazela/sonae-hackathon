<?php
    header('Content-Type: application/json');
    
    include_once('../../common/init.php');
    include_once('../../database/carrinho.php');

    if(!isset($_GET['iduser'])) {
            return "Error! UsernameID not set";
        }
    if(!isset($_GET['idproduto'])) {
            return "Error! UsernameID not set";
        }

    return json_encode(addCompras($_GET['iduser'],$_GET['idproduto']));
?>