<?php
include_once('../../common/init.php');

function addCarrinho($iduser, $idproduto,$quantidade) {
    global $db;
    $result = $db->prepare("INSERT INTO produtosCarrinho VALUES (?, ?, ?)");
    $result->execute(array($iduser, $idproduto, $quantidade));
}

function getCarrinho($iduser) {
    global $db;

    $query = "SELECT * FROM produtosCarrinho WHERE idUser='$iduser'";

    $resq = $db->query($query);
    return $resq->fetchAll();
}

function removeCarrinho($iduser,$idproduto) {
    global $db;

    $delete = "DELETE * FROM produtosCarrinho WHERE idUser='$iduser' AND idProduto='$idproduto'";

    if(($return = $db->exec($delete))) {
        return "SUCCESS";
    } else {
        return "QUERY_ERROR";
    }
}

/*
function clearCarrinho($iduser){
	global $db;

	$delete = "DELETE * FROM produtosCarrinho WHERE idUser = '$iduser'"

	if($return = $db->exec($delete))) {
        return "SUCCESS";
    } else {
        return "QUERY_ERROR";
    }
}
*/

/*
function setCarrinhoQuantity($iduser, $idproduto){
	global $db;

	$update = "UPDATE produtosCarrinho SET quantidade = (quantidade - 1) WHERE idUser = '$iduser' AND idProduto = '$idproduto'"

	if(($return = $db->exec($update)) {
        return "SUCCESS";
    } else {
        return "QUERY_ERROR";
    }
}
*/

?>