package com.java_shop.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "product_name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "product_description", columnDefinition = "text", nullable = false)
    private String description;

    @NotNull
    @Column(name = "product_price", nullable = false)
    private double price;



    @Column(name = "product_image_1")
    private String image1;

    @Column(name = "product_image_2")
    private String image2;

    @Column(name = "product_image_3")
    private String image3;

    @Column(name = "product_image_4")
    private String image4;

    @NotNull
    @Column(name = "product_category")
    @Enumerated(value = EnumType.STRING)
    private ProductCategory productCategory;

    @Column(name = "product_size")
    @Enumerated(value = EnumType.STRING)
    private ProductSize productSize;

    @NotNull
    @Column(name ="product_genre")
    @Enumerated(value = EnumType.STRING)
    private ProductGenre productGenre;

    @ManyToMany(mappedBy = "productList", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("productList")
    private List<OrderData> orderDataList;


}
