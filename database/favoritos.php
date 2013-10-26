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

    $delete = "DELETE FROM produtosFavoritos WHERE idUser='$iduser' AND idUser='$iduser' ";

    if(($return = $db->exec($delete))) {
        return "SUCCESS";
    } else {
        return "QUERY_ERROR";
    }
}

function get($iduser){
    global $db;

    $query = "SELECT * FROM produtosFavoritos WHERE idUser='$iduser'";

    return $db->query($query);
}
?>