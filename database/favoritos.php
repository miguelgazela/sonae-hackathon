<?php
    function add($iduser,$idproduto) {
        global $db;

        $insert = "INSERT INTO produtosFavoritos VALUES ('$iduser','$idproduto')";
        if(($query = $db->query($insert))) {
            return "SUCCESS";
        } else {
            return "QUERY_ERROR";
        }
    }

function remove($iduser,$idproduto) {
    global $db;
    $result = $db->prepare("DELETE FROM produtosFavoritos WHERE idUser = ? AND idProduto = ?");
    $result->execute(array($iduser, $idProduto));
}

function get($iduser){
    global $db;
    $result = $db->prepare("SELECT produtos.* from produtos, produtosFavoritos WHERE produtos.id = produtosFavoritos.idProduto AND produtosFavoritos.idUser = ?");
    $result->execute(array($iduser));
    return $result->fetchAll();
}
?>