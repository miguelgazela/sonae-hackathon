<?php 
    include_once('../../common/init.php');

    header('Content-type: application/json');

    if(!isset($_GET['idproduto'])) {
        $response['error'] = "no_product_id";
        die(json_encode($response));
    }

    global $db;
    $result = $db->prepare("SELECT * FROM produtos WHERE id = ?");
    $result->execute(array($_GET['idproduto']));
    die(json_encode($result->fetch()));
?>