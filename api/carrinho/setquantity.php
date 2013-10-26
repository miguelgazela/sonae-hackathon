<?php
    header('Content-Type: application/json');
    
    include_once('../../common/init.php');
    include_once('../../database/carrinho.php');

    if(!isset($_GET['user'])) {
            return "Error! UsernameID not set";
        }
    if(!isset($_GET['idproduto'])) {
            return "Error! UsernameID not set";
        }
        
    return json_encode(setCarrinhoQuantity($_GET['user'], $_GET['idproduto']));
?>