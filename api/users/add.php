<?php 
    include_once('../../common/init.php');
    include_once('../../database/users.php');

    if(!isset($_GET['name'])) {
            return "Error! Username not set";
        }
    if(!isset($_GET['password'])) {
            return "Error! Password not set";
        }

    return json_encode(addUser($_GET['name'],$_GET['password']));
?>