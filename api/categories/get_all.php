<?php 
    include_once('../../common/init.php');
    header('Content-type: application/json');

    global $db;
    $result = $db->prepare("SELECT * FROM categoria");
    $result->execute();
    die(json_encode($result->fetchAll()));
?>