<?php
// models/Book.php

require_once 'AbstractProduct.php';

class Book extends AbstractProduct {
    private $weight;

    public function __construct($sku, $name, $price,$type, $weight) {
        parent::__construct($sku, $name, $price, $type);
        $this->weight = $weight;
    }

    public function getWeight() {
        return $this->weight;
    }

    public function setWeight($weight) {
        $this->weight = $weight;
    }

    public function getDetails() {
        return [
            'sku' => $this->getSku(),
            'name' => $this->getName(),
            'price' => $this->getPrice(),
            'type' => $this->getType(),
            'weight' => $this->getWeight()
        ];
    }
}
