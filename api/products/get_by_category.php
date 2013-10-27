<?php 
    include_once('../../common/init.php');

    header('Content-type: application/json');

    if(!isset($_GET['idcategoria'])) {
        $response['error'] = "no_category_id";
        die(json_encode($response));
    }

    global $db;
    $result = $db->prepare("SELECT * FROM produtos WHERE idCategoria = ?");
    $result->execute(array($_GET['idcategoria']));
    die(json_encode($result->fetchAll()));
?>