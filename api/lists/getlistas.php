<?php    
    include_once('../../common/init.php');
    
    header('Content-Type: application/json');

    if(!isset($_GET['iduser'])) {
        $result['error'] = "no_id";
        die(json_encode($result));
    }

    global $db;
    //$result = $db->prepare("SELECT listas.* FROM listasUsers, listas WHERE listas.id = listasUsers.idLista AND listasUsers = ?");
    $result = $db->prepare("SELECT * from listas;");
    $result->execute(array($_GET['iduser']));
    $listas = $result->fetchAll();

    /*
    foreach($listas as &$lista) {
        $lista["members"] = getNumMembers($lista['id']);
    }
    */

    die(json_encode($listas));
?>