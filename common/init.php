<?php
    // Connect to the Database
try {    
$db = new PDO("sqlite:../database/database.db");
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
	var_dump($db);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
?>
