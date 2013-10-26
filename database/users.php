<?php
    include_once('../../common/init.php');
    function addUser($name,$password) {
        global $db;

        $insert = "INSERT INTO users VALUES (Null,'$name','$password')";
        if(($query = $db->query($insert))) {
            return "SUCCESS";
        } else {
            return "QUERY_ERROR";
        }
    }

function get(){
    global $db;

    $query = "SELECT * FROM users";
	
    $result = $db->query($query);
    return $result->fetchAll();
}
?>