<?php
    header('Content-Type: application/json');
    
    include_once('../../common/init.php');

    if(!isset($_GET['iduser'])) {
        die();
    }

    global $db;
    $result = $db->prepare("SELECT * from produtos, produtosCarrinho WHERE produtos.id = produtosCarrinho.idProduto AND produtosCarrinho.idUser = ? ORDER BY produtos.name ASC");
    $result->execute(array($_GET['iduser']));
    die(json_encode($result->fetchAll())); 
?>