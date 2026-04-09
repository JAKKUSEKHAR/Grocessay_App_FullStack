import axios from "axios";

export const addProduct = (productData) => {
  return axios.post(
    "https://ecommerce-backend-latest-d0jt.onrender.com/api/admin/products",
    productData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    }
  );
}; 

export const updateProduct = (id, data) =>
  axios.put(`https://ecommerce-backend-latest-d0jt.onrender.com/api/admin/products/${id}`, data);

export const deleteProduct = (id) =>
  axios.delete(`https://ecommerce-backend-latest-d0jt.onrender.com/api/admin/products/${id}`);