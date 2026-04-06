import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const placeOrder = async (items) => {
  const payload = {
    userId: Number(localStorage.getItem("userId")), // 
    items: items.map(i => ({
      productId: i.id,
      quantity: i.qty
    }))
    
  };
console.log("ORDER PAYLOAD:", payload);
  const res = await axios.post(`${BASE_URL}/orders`, payload);
  return res.data;
};

export const fetchOrders = async () => {
  const userId = localStorage.getItem("userId");
  const res = await axios.get(
    `http://localhost:8080/api/orders?userId=${userId}`
  );
  console.log(res.data);
  return res.data;
};