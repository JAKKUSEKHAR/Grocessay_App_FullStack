import axios from "axios";

export const addProduct = (productData) => {
  return axios.post(
    "http://localhost:8080/api/admin/products",
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
  axios.put(`http://localhost:8080/api/admin/products/${id}`, data);

export const deleteProduct = (id) =>
  axios.delete(`http://localhost:8080/api/admin/products/${id}`);