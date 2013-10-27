<?php 
    include_once('../../common/init.php');

    if(!isset($_GET['iduser'])) {
        die();
    }
    if(!isset($_GET['idproduto'])) {
        die();
    }
    
    global $db;
    $result = $db->prepare("INSERT INTO produtosFavoritos VALUES (?,?)");
    $result->execute(array($_GET['iduser'], $_GET['idproduto']));
?>