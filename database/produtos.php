<?php
include_once('../../common/init.php');

function addProduto($idprod, $idcat, $name, $marca, $descricao, $preco, $precoalternativo, $imagemlarge, $imagemsmall){
	global $db;

	$insert = "INSERT INTO produtos VALUES ('$idprod','$idcat','$name', '$marca', '$descricao', '$preco', '$precoalternativo', '$imagemlarge', '$imagemsmall')";
    if(($query = $db->query($insert))) {
        return "SUCCESS";
    } else {
        return "QUERY_ERROR";
    }
}

function getProdutoById($idproduto) {
    global $db;

    $query = "SELECT * FROM produtos WHERE id ='$idproduto'";

    $resq = $db->query($query);
    return $resq->fetchAll();
}

function getProdutoByCategoria($idcategoria){
	global $db;

    $query = "SELECT * FROM produtos WHERE idCategoria ='$idcategoria'";

    $resq = $db->query($query);
    return $resq->fetchAll();
}

?>