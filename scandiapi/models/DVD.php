<?php
// models/DVD.php

require_once 'AbstractProduct.php';

class DVD extends AbstractProduct {
    private $size;

    public function __construct($sku, $name, $price,$type, $size) {
        parent::__construct($sku, $name, $price, $type);
        $this->size = $size;
    }

    public function getSize() {
        return $this->size;
    }

    public function setSize($size) {
        $this->size = $size;
    }

    public function getDetails() {
        return [
            'sku' => $this->getSku(),
            'name' => $this->getName(),
            'price' => $this->getPrice(),
            'type' => $this->getType(),
            'size' => $this->getSize()
        ];
    }
}
