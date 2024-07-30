<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
include './models/DbConnect.php';
include './routes/routes.php';

$ObjDB = new DbConnect();
$conn = $ObjDB->connect();
if ($conn === null) {
    die('Database connection failed.');
}
handleRequest($conn);