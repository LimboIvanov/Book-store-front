import React, { useState, useEffect } from 'react';
import { getOrder } from '../services/OrderService.js';
import { useParams } from 'react-router-dom';

const OrderComponent = () => {
    const { userId } = useParams(); // Assuming you're passing the user ID as a URL parameter
    const [order, setOrder] = useState(null);

    useEffect(() => {
        fetchOrder();
    }, [userId]);

    const fetchOrder = async () => {
        try {
            const response = await getOrder(userId);
            setOrder(response.data);
        } catch (error) {
            console.error("Error fetching order:", error);
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
                        <p>Book: {item.book.title}</p>
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

export default OrderComponent;
