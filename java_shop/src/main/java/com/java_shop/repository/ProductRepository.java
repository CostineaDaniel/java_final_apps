package com.java_shop.repository;

import com.java_shop.model.Product;
import com.java_shop.model.ProductGenre;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {


    List<Product> findAllByGenre(ProductGenre productGenre);
}
