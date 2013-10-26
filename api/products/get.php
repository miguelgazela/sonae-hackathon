<?php 
    include_once('../../common/init.php');
    include_once('../../database/produtos.php');

    header('Content-type: application/json');

    if(!isset($_GET['idproduto'])) {
        $response['error'] = "no_product_id";
        die(json_encode($response));
    }

    die(json_encode(getProdutoById($_GET['idproduto'])));
?>