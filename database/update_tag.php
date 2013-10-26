<?php
include_once('../../common/init.php');
global $db;

$tag = $_POST['tag_text'];
$count = $_POST['count_number'];

$sql = "INSERT INTO searchTags (tag, resultsCount) VALUES (?,?)";

$statement = $db->prepare($sql);
$statement->execute(array($tag, $count));

$results = $statement;
echo "success";
?>