<?php 
    include_once('../../common/init.php');
    include_once('../../database/produtos.php');

    header('Content-type: application/json');

    if(!isset($_GET['idcategoria'])) {
        $response['error'] = "no_category_id";
        die(json_encode($response));
    }

    die(json_encode(getProdutoByCategoria($_GET['idcategoria'])));
?>