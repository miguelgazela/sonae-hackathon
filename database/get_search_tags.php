<?php
include_once('../../common/init.php');
global $db;


$sql = "SELECT tag, resultsCount FROM searchTags ORDER BY resultsCount DESC";
$statement = $db->prepare($sql);
$statement->execute();

$results = $statement->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($results);
?>