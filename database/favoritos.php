<?php
    function add($iduser,$idproduto) {
        global $db;
        $result = $db->prepare("INSERT INTO produtosFavoritos VALUES (?,?)");
        $result->execute(array($iduser, $idproduto));
    }

function remove($iduser,$idproduto) {
    global $db;
    $result = $db->prepare("DELETE FROM produtosFavoritos WHERE idUser = ? AND idProduto = ?");
    $result->execute(array($iduser, $idProduto));
}

function get($iduser){
    global $db;
    $result = $db->prepare("SELECT produtos.* from produtos, produtosFavoritos WHERE produtos.id = produtosFavoritos.idProduto AND produtosFavoritos.idUser = ? ORDER BY produtos.name ASC");
    $result->execute(array($iduser));
    return $result->fetchAll();
}
?>