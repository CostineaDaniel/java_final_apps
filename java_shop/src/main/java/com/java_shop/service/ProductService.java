package com.java_shop.service;

import com.java_shop.model.Product;
import com.java_shop.model.ProductGenre;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<Product> getAllProducts();
    Optional<Product> getProductById(Long id);
    List<Product> getWomenProducts();
    List<Product> getMenProducts();
    Product saveProduct(Product product);
    Product updateProduct(Product product);
    void deleteProductById(Long id);
    List<Product> getShoesProducts();
    List<Product> getAccessoryProducts();
    List<Product> getLatestProducts();




}
