<?php
$db = new PDO("sqlite:database.db");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);


$sql = "SELECT tag, resultsCount FROM searchTags ORDER BY resultsCount DESC";
$statement = $db->prepare($sql);
$statement->execute();

$results = $statement->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($results);
?>