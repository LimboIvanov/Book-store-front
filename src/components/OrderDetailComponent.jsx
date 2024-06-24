import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../services/BookService.js';


const OrderDetailComponent = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);


    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            const response = await getOrderById(orderId);
            setOrder(response.data);
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Order Details</h2>
            <p>Order ID: {order.id}</p>
            <p>Total Price: {order.totalPrice}</p>
            <p>Status: {order.status}</p>
            <h3>Order Items</h3>
            {order.orderItems.length > 0 ? (
                order.orderItems.map((item) => (
                    <div key={item.id}>
                        <p>Book Title: {item.book.title}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {item.price}</p>
                        <hr />
                    </div>
                ))
            ) : (
                <p>No items in this order.</p>
            )}
        </div>
    );
};

export default OrderDetailComponent;
