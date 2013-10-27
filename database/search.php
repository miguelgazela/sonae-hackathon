<?php
include_once('../../common/init.php');
global $db;

$search = $_POST['search'];
$tags = explode(" ", $search);
$tag = $tags[0];

$sql = "SELECT name, marca, descricao, preco, precoAlternativo, imagemSmall from (
    SELECT name, marca, descricao, preco, precoAlternativo, imagemSmall FROM (
    SELECT 1 as relevance, name, marca, descricao, preco, precoAlternativo, imagemSmall FROM produtos WHERE name LIKE '%" .$tag."%' UNION
    SELECT 100 as relevance, name, marca, descricao, preco, precoAlternativo, imagemSmall FROM produtos WHERE marca LIKE '%" .$tag."%' UNION
    SELECT 10 as relevance, name, marca, descricao, preco, precoAlternativo, imagemSmall FROM (
        SELECT * FROM categoria, produtos 
        WHERE produtos.idCategoria = categoria.idCategoria 
        AND categoria.nome LIKE '%" .$tag."%'
        ) ORDER BY relevance ASC
    )";

$tag = "condicionador";
for ($i = 1; $i < count($tags); $i++) {
    $sql .= "INTERSECT SELECT name, marca, descricao, preco, precoAlternativo, imagemSmall FROM (
    SELECT 1 as relevance, name, marca, descricao, preco, precoAlternativo, imagemSmall FROM produtos WHERE name LIKE '%" .$tags[$i]."%' UNION
    SELECT 100 as relevance, name, marca, descricao, preco, precoAlternativo, imagemSmall FROM produtos WHERE marca LIKE '%" .$tags[$i]."%' UNION
    SELECT 10 as relevance, name, marca, descricao, preco, precoAlternativo, imagemSmall FROM (
        SELECT * FROM categoria, produtos 
        WHERE produtos.idCategoria = categoria.idCategoria 
        AND categoria.nome LIKE '%" .$tags[$i]."%'
        ) ORDER BY relevance ASC
    )";
}

$sql .= ")";

$statement = $db->prepare($sql);
$statement->execute();

$results = $statement->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($results);
?>