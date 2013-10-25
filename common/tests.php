<?php
	include_once('init.php');
    include_once("../database/taxes.php");

    $result = $db->query("SELECT * from utilizador");
    
    var_dump($result->fetchAll());
?>