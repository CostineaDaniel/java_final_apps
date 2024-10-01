package com.java_shop.service.impl;

import com.java_shop.exception.BadRequestException;
import com.java_shop.exception.ResourceNotFoundException;
import com.java_shop.model.OrderData;
import com.java_shop.model.PaymentStatus;
import com.java_shop.repository.OrderDataRepository;
import com.java_shop.service.OrderDataService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderDataServiceImpl implements OrderDataService {
    OrderDataRepository orderDataRepository;

    @Override
    public void cancelOrderById(Long id) {
        Optional<OrderData> optionalOrderData = getOrderById(id);
        optionalOrderData.orElseThrow(
                () -> new ResourceNotFoundException("Comanda cu idul : " + id + " nu exista"));

        OrderData order = optionalOrderData.get();
        order.setPaymentStatus(PaymentStatus.CANCEL);
        this.orderDataRepository.save(order);
    }




    @Override
    public void confirmOrderById(Long id) {
        Optional<OrderData> optionalOrderData = getOrderById(id);
        optionalOrderData.orElseThrow(
                () -> new ResourceNotFoundException("Comanda cu idul : " + id + " nu exista"));

        OrderData order = optionalOrderData.get();
        order.setPaymentStatus(PaymentStatus.CONFIRMED);
        this.orderDataRepository.save(order);
    }

    public OrderDataServiceImpl(OrderDataRepository orderDataRepository) {
        this.orderDataRepository = orderDataRepository;
    }

    @Override
    public List<OrderData> getAllOrders() {
        return orderDataRepository.findAll();
    }

    @Override
    public Optional<OrderData> getOrderById(Long id) {
        return orderDataRepository.findById(id);
    }

    @Override
    public OrderData saveOrder(OrderData orderData) {
        if (orderData == null) {
            throw new BadRequestException("Comanda este invalida");
        }
        if (orderData.getCustomer() == null) {
            throw new BadRequestException("Comanda nu are alocat un client");
        }
        if (orderData.getProductList() == null || orderData.getProductList().isEmpty()) {
            throw new BadRequestException("Comanda nu are produse pentru a pute fi plasata");
        }

        return orderDataRepository.save(orderData);
    }

    @Override
    public OrderData updateOrder(OrderData orderData) {
        if (orderData == null) {
            throw new BadRequestException("Comanda este invalida");
        }
        if (orderData.getId() == null) {
            throw new BadRequestException("");
        }
        if (orderData.getCustomer() == null) {
            throw new BadRequestException("Comanda nu are alocat un client");
        }
        if (orderData.getProductList() == null || orderData.getProductList().isEmpty()) {
            throw new BadRequestException("Comanda nu are produse pentru a pute fi plasata");
        }

        Optional<OrderData> optionalOrderData = getOrderById(orderData.getId());
        optionalOrderData.orElseThrow(
                () -> new ResourceNotFoundException("Comanda cu idul : " + orderData.getId() + " nu exista in baza de date pentru a putea fi actualizata"));

        return orderDataRepository.save(orderData);
    }

    @Override
    public void deleteOrderById(Long id) {
        Optional<OrderData> optionalOrderData = getOrderById(id);
        optionalOrderData.orElseThrow(
                () -> new ResourceNotFoundException("Comanda cu idul : " + id + " nu exista pentru a putea fi stersa"));

        this.orderDataRepository.deleteById(id);
    }


}
