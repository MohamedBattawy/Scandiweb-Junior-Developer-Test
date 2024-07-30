<?php
// routes/routes.php

// Include necessary files

require_once './controllers/ProductController.php';

// Define the route handler function
function handleRequest($conn) {
    $controller = new ProductController($conn);
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            $controller->getProducts();
            break;
        case 'POST':
            $controller->addProduct();
            break;
        case 'DELETE':
            $controller->deleteProduct();
            break;
        case 'OPTIONS':
            // Handle OPTIONS request (preflight)
            header("HTTP/1.1 200 OK");
            exit;
        default:
            header("HTTP/1.1 405 Method Not Allowed");
            break;
    }
}