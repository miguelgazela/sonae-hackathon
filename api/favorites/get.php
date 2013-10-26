<?php 
    include_once('../../common/init.php');
    include_once('../../database/favoritos.php');

    header('Content-type: application/json');

    if(!isset($_GET['iduser'])) {
        $response['error'] = "no_user_id";
        die(json_encode($response));
    }

    die(json_encode(get($_GET['iduser'])));
?>