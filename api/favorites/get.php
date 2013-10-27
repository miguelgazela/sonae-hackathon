<?php 
    include_once('../../common/init.php');

    header('Content-type: application/json');

    if(!isset($_GET['iduser'])) {
        $response['error'] = "no_user_id";
        die(json_encode($response));
    }

    global $db;
    $result = $db->prepare("SELECT produtos.* from produtos, produtosFavoritos WHERE produtos.id = produtosFavoritos.idProduto AND produtosFavoritos.idUser = ? ORDER BY produtos.name ASC");
    $result->execute(array($_GET['iduser']));
    die(json_encode($result->fetchAll()));
?>