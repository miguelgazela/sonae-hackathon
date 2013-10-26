<?php
$db = new PDO("sqlite:database.db");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

$tag = $_POST['tag_text'];
$count = $_POST['count_number'];

$sql = "INSERT INTO searchTags (tag, resultsCount) VALUES (?,?)";

$statement = $db->prepare($sql);
$statement->execute(array($tag, $count));

$results = $statement;
echo "success";
?>