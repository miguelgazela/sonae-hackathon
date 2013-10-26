<?php
    header('Content-Type: application/json');
    
    include_once('../../common/init.php');
    include_once('../../database/users.php');

    if(!isset($_GET['name'])) {
            return "Error! Username not set";
        }
    if(!isset($_GET['password'])) {
            return "Error! Password not set";
        }

    var_dump(addUser($_GET['name'],$_GET['password']));
?>