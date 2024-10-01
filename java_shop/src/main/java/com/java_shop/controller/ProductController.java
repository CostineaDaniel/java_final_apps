package com.java_shop.controller;

import com.java_shop.exception.BadRequestException;
import com.java_shop.exception.ResourceNotFoundException;
import com.java_shop.model.Product;
import com.java_shop.model.ProductGenre;
import com.java_shop.service.ProductService;
import com.java_shop.utils.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping()
    public ResponseEntity<ApiResponse> getAllProducts() {
        List<Product> products = productService.getAllProducts();

        return ResponseEntity.ok(ApiResponse.success("Lista produselor : ", products));
    }

    @GetMapping("/productById/{id}")
    public ResponseEntity<ApiResponse> getProductById(@PathVariable(name = "id") Long id) {
        Optional<Product> optionalProduct = productService.getProductById(id);
        optionalProduct.orElseThrow(
                () -> new ResourceNotFoundException("produsul cu idu-l : " + id + " nu a fost gasit !"));

        return ResponseEntity.ok(ApiResponse.success("Produsul a fost gasit ", optionalProduct.get()));
    }

    @GetMapping("/womenProducts")
    public ResponseEntity<ApiResponse> getWomenProducts() {
        List<Product> productsByGenre = productService.getWomenProducts();

        return ResponseEntity.ok(ApiResponse.success("Lista : ", productsByGenre));
    }

    @GetMapping("/menProducts")
    public ResponseEntity<ApiResponse> getMenProducts() {
        List<Product> productsByGenre = productService.getMenProducts();

        return ResponseEntity.ok(ApiResponse.success("Lista : ", productsByGenre));
    }

    @GetMapping("/shoesProducts")
    public ResponseEntity<ApiResponse> getShoesProducts() {
        List<Product> productsByType = productService.getShoesProducts();

        return ResponseEntity.ok(ApiResponse.success("Lista : ", productsByType));
    }

    @GetMapping("/accessoryProducts")
    public ResponseEntity<ApiResponse> getAccessoryProducts() {
        List<Product> productsByType = productService.getAccessoryProducts();

        return ResponseEntity.ok(ApiResponse.success("Lista : ", productsByType));
    }

    @PostMapping("/addProduct")
    public ResponseEntity<ApiResponse> addProduct(@Valid @RequestBody Product product) {
        if (product == null) {
            throw new BadRequestException("Produsul nu este valid");
        }
        Product savedProduct = this.productService.saveProduct(product);
        return ResponseEntity.ok(ApiResponse.success("Produsul a fost salvat cu succes", savedProduct));
    }

    @PutMapping("/updateProduct")
    public ResponseEntity<ApiResponse> updateProduct(@RequestBody Product product) {
        if (product == null || product.getId() == null) {
            throw new BadRequestException("Produsul nu este valid");
        }
        Product updatedProduct = this.productService.saveProduct(product);
        return ResponseEntity.ok(ApiResponse.success("Produsul a fost actualizat cu succes", updatedProduct));
    }

    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<ApiResponse> deleteProductById(@PathVariable(name="id") Long id){
        this.productService.deleteProductById(id);

        return ResponseEntity.ok(ApiResponse.success("Produsul a fost sters cu succes",null));
    }

    @GetMapping("/latestProducts")
    public ResponseEntity<ApiResponse> getLatestProducts(){
        List<Product> list = this.productService.getLatestProducts();
        return ResponseEntity.ok(ApiResponse.success("Lista ultimelor produse : ",list));
    }

}
