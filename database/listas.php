<?php
include_once('../../common/init.php');
function createLista($name,$iduser) {
    global $db;

    $insert = "INSERT INTO listas VALUES (Null,'$name','$iduser')";
    if(($query = $db->query($insert))) {
        return "SUCCESS";
    } else {
        return "QUERY_ERROR";
    }
}

function eliminateLista($idlista) {
    global $db;

    $delete = "DELETE FROM listas WHERE id='$idlista'";

     if(($return = $db->exec($delete))) {
         return "SUCCESS";
     } else {
         return "QUERY_ERROR";
    }
}
function addUser($idlista,$iduser) {
    global $db;

    $insert = "INSERT INTO listasUsers VALUES ('$idlista','$iduser')";
    if(($query = $db->query($insert))) {
        return "SUCCESS";
    } else {
        return "QUERY_ERROR";
    }
}

function removeUser($idlista,$iduser) {
    global $db;

    $delete = "DELETE FROM listasUsers WHERE idLista='$idlista' AND idUser='$iduser' ";

    if(($return = $db->exec($delete))) {
        return "SUCCESS";
    } else {
        return "QUERY_ERROR";
    }
}

function addProduto($idlista,$idproduto,$quantidade) {
    global $db;

    $insert = "INSERT INTO listasProdutos VALUES ('$idlista','$idproduto','$quantidade')";
    if(($query = $db->query($insert))) {
        return "SUCCESS";
    } else {
        return "QUERY_ERROR";
    }
}

function removeProduto($idlista,$idproduto) {
    global $db;

    $delete = "DELETE FROM listasProdutos WHERE idLista='$idlista' AND idProduto='$idproduto'";

    if(($return = $db->exec($delete))) {
        return "SUCCESS";
    } else {
        return "QUERY_ERROR";
    }
}

function getProdutos($idlista) {
    global $db;

    $query = "SELECT * FROM listasProdutos WHERE idLista='$idlista'";

    return $db->query($query);
}

function getListas($iduser) {
    global $db;

    $query = "SELECT * FROM listasUsers WHERE idUser='$iduser'";

    return $db->query($query);
}

function getListasResponsavel($iduser) {
    global $db;

    $query = "SELECT * FROM listas WHERE idresponsavel='$iduser'";

    return $db->query($query);
}
?>