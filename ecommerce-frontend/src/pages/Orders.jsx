import { useEffect, useState } from "react";
import { fetchOrders } from "../api/orderApi";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  return (
    <div className="app-shell">
      <div className="orders-page">
        <h2>My Orders</h2>

        {orders.length === 0 && <p>No orders yet</p>}

        {orders.map(order => (
          <div key={order.orderId} className="order-card">
            <div className="order-header">
              <strong>Order #{order.orderId}</strong>
              <span>{order.status}</span>
            </div>

            <div className="order-items">
              {order.items.map((i, idx) => (
                <div key={idx} className="order-item">
                  {i.productName} × {i.quantity}
                  <span>₹{i.price * i.quantity}</span>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <strong>Total: ₹{order.totalAmount}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
