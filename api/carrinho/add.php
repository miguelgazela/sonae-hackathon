<?php    
    include_once('../../common/init.php');

    header('Content-Type: application/json');

    if(!isset($_GET['iduser'])) {
        die();
    }
    if(!isset($_GET['idproduto'])) {
        die();
    }
    if(!isset($_GET['quantidade'])) {
        die();
    }

    global $db;
    $result = $db->prepare("INSERT INTO produtosCarrinho VALUES (?, ?, ?)");
    $result->execute(array($_GET['iduser'], $_GET['idproduto'], $_GET['quantidade']));

    $result = $db->prepare("SELECT * FROM produtos WHERE id = ?");
    $result->execute(array($_GET['idproduto']));
    die(json_encode($result->fetch()));
?>