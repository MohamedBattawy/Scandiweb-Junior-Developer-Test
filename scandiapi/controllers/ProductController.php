<?php
// controllers/ProductController.php

require_once './models/ProductModel.php';
require_once './models/AbstractProduct.php';
require_once './models/DVD.php';
require_once './models/Book.php';
require_once './models/Furniture.php';

use models\DVD;
use models\Book;
use models\Furniture;

class ProductController {
    private $model;

    public function __construct($conn) {
        $this->model = new ProductModel($conn);
    }

    public function getProducts() {
        $products = $this->model->fetchAllProducts();
        header("Content-Type: application/json");
        echo json_encode($products);
    }
    public function addProduct() {
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Determine the product class name
        $productClass = ucfirst($data['type']);
        
        // Check if the class exists
        if (!in_array($productClass, ['DVD', 'Book', 'Furniture'])) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(["status" => "error", "message" => "Invalid product type."]);
            return;
        }
        
        // Filter out null values and prepare arguments for the constructor
        $arguments = array_filter($data, function($value) {
            return $value !== null && $value !== '';
        });
        
        // Create a new product instance
        $product = new $productClass(...array_values($arguments));
        
        // Save the product
        $result = $this->model->saveProduct($product);
        
        if ($result) {
            echo json_encode(["status" => "success", "message" => "Product added successfully.","arguements"=>$arguments, "product:"=>$product]);
        } else {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(["status" => "error", "message" => "Failed to add product."]);
        }
    }
    

    public function deleteProduct() {
        // Read JSON input
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['skus']) && is_array($input['skus'])) {
            $skus = $input['skus'];
            $result = $this->model->deleteProduct($skus);

            if ($result) {
                header("HTTP/1.0 200 OK");
                echo json_encode(["success" => "Products deleted successfully."]);
            } else {
                header("HTTP/1.0 500 Internal Server Error");
                echo json_encode(["error" => "Failed to delete products."]);
            }
        } else {
            header("HTTP/1.0 400 Bad Request");
            echo json_encode(["error" => "Invalid input."]);
        }
    }
}
