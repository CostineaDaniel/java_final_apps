package com.java_shop.controller;

import com.java_shop.exception.ResourceNotFoundException;
import com.java_shop.model.OrderData;
import com.java_shop.model.Product;
import com.java_shop.repository.OrderDataRepository;
import com.java_shop.service.OrderDataService;
import com.java_shop.utils.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/orders")
public class OrderDataController {
    private final OrderDataService orderDataService;

    public OrderDataController(OrderDataService orderDataService) {
        this.orderDataService = orderDataService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllOrders() {
        List<OrderData> orderDataList = this.orderDataService.getAllOrders();

        return ResponseEntity.ok(ApiResponse.success("Lista cu comenzile : ", orderDataList));
    }


    @GetMapping("/orderById/{id}")
    public ResponseEntity<ApiResponse> getOrderById(@PathVariable(name = "id") Long id) {
        Optional<OrderData> optionalOrderData = this.orderDataService.getOrderById(id);

        optionalOrderData.orElseThrow(() -> new ResourceNotFoundException("Comanda cu idul : " + id + " nu a fost gasit"));

        return ResponseEntity.ok(ApiResponse.success("Comanda a fost gasita : ", optionalOrderData));
    }

    @PostMapping("/addOrder")
    public ResponseEntity<ApiResponse> createOrder(@RequestBody OrderData orderData) {
        OrderData orderSaved = orderDataService.saveOrder(orderData);

        return ResponseEntity.ok(ApiResponse.success("Comanda a fost salvata cu succes", orderSaved));
    }

    @PutMapping("/updateOrder")
    public ResponseEntity<ApiResponse> updateOrder(@RequestBody OrderData orderData) {
        OrderData orderUpdated = orderDataService.saveOrder(orderData);

        return ResponseEntity.ok(ApiResponse.success("Comanda a fost salvata cu succes", orderUpdated));
    }

    @DeleteMapping("/deleteOrderById/{id}")
    public ResponseEntity<ApiResponse> deleteOrderById(@PathVariable(name = "id") Long id) {
        this.orderDataService.deleteOrderById(id);

        return ResponseEntity.ok(ApiResponse.success("Comanda cu idul", null));
    }

    @PostMapping("/confirmOrderById/{id}")
    public ResponseEntity<ApiResponse> confirmOrderById(@PathVariable Long id) {
        this.orderDataService.confirmOrderById(id);
        return ResponseEntity.ok(ApiResponse.success("Order with id: " + id + " was confirmed successfully", null));
    }

    @PostMapping("/cancelOrderById/{id}")
    public ResponseEntity<ApiResponse> cancelOrderById(@PathVariable Long id) {
        this.orderDataService.cancelOrderById(id);
        return ResponseEntity.ok(ApiResponse.success("Order with id: " + id + " was canceled successfully", null));

    }


}
