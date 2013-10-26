
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
    $result = $db->prepare("SELECT * FROM produtos WHERE id = ?");
    $result->execute(array($idproduto));
    return $result->fetch();

}

function getProdutoByCategoria($idcategoria){
    global $db;
    $result = $db->prepare("SELECT * FROM produtos WHERE idCategoria = ?");
    $result->execute(array($idcategoria));
    return $result->fetchAll();
}

?>