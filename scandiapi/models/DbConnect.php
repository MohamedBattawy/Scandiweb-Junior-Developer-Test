<?php
// DbConnect.php
class DbConnect {
    private $config;

    public function __construct() {
        $this->config = include 'config.php';
    }

    public function connect() {
        try {
            $dsn = "mysql:host={$this->config['server']};dbname={$this->config['dbname']}";
            $pdo = new PDO($dsn, $this->config['user'], $this->config['pass']);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
            return null;
        }
    }
}