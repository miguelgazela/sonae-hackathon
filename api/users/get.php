<?php
    header('Content-Type: application/json');
    
    include_once('../../common/init.php');
    include_once('../../database/users.php');

    return json_encode(get());
?>