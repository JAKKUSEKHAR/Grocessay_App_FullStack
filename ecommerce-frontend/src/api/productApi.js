import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

// const authHeader = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`
//   }
// });

export const fetchProducts = async () => {
  const res = await axios.get(
    `${BASE_URL}/products`
    // authHeader()
  );
  return res.data;
};

export const fetchCategories = async () => {
  const res = await axios.get(
    `${BASE_URL}/categories`
    // authHeader()
  );
  return res.data;
};
 
export const fetchProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/products/${id}`);
  return res.data;
};