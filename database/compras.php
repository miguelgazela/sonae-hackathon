<?php
include_once('../../common/init.php');

function addCompras($iduser, $idproduto) {
    global $db;

    $insert = "INSERT INTO produtosComprados VALUES ('$iduser','$idproduto')";
    if(($query = $db->query($insert))) {
        return "SUCCESS";
    } else {
        return "QUERY_ERROR";
    }
}

function getCompras($iduser) {
    global $db;

    $query = "SELECT * FROM produtosComprados WHERE idUser='$iduser'";

    $resq = $db->query($query);
    return $resq->fetchAll();
}

?>