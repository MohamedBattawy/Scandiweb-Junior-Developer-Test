<?php
// models/ProductModel.php
require_once 'AbstractProduct.php';

class ProductModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function fetchAllProducts() {
        $stmt = $this->conn->prepare("SELECT * FROM products ORDER BY sku");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function saveProduct($product) {
        try {
            // Get product details using the getDetails method
            $details = $product->getDetails();
            $sku = $details['sku'];
    
            // Check if the SKU already exists
            $stmt = $this->conn->prepare("SELECT COUNT(*) FROM products WHERE sku = ?");
            $stmt->execute([$sku]);
            $exists = $stmt->fetchColumn();
    
            if ($exists) {
                // SKU already exists
                return false; // Or you can return a custom error message or status
            }
    
            // Construct SQL statement for insertion
            $columns = implode(", ", array_keys($details));
            $placeholders = implode(", ", array_fill(0, count($details), "?"));
            $sql = "INSERT INTO products ($columns) VALUES ($placeholders)";
            $stmt = $this->conn->prepare($sql);
    
            // Bind parameters
            $values = array_values($details);
            return $stmt->execute($values);
        } catch (PDOException $e) {
            error_log("Error adding product: " . $e->getMessage());
            return false;
        }
    }
    

    public function deleteProduct($skus) {
        // Prepare SQL statement to delete multiple products
        $placeholders = implode(',', array_fill(0, count($skus), '?'));
        $sql = "DELETE FROM products WHERE sku IN ($placeholders)";
        $stmt = $this->conn->prepare($sql);

        // Execute the statement with the SKUs
        return $stmt->execute($skus);
    }
}
