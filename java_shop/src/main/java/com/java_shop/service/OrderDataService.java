package com.java_shop.service;

import com.java_shop.model.OrderData;
import org.hibernate.query.Order;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface OrderDataService {

    List<OrderData> getAllOrders();
    Optional<OrderData> getOrderById(Long id);
    OrderData saveOrder(OrderData orderData);
    OrderData updateOrder(OrderData orderData);
    void deleteOrderById(Long id);

    void confirmOrderById(Long id);

    void cancelOrderById(Long id);

}
