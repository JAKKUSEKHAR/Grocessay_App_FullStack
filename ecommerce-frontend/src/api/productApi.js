import axios from "axios";

const BASE_URL = "https://ecommerce-backend-latest-d0jt.onrender.com/api";

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


export const aiBot = async ()=>{
  try{

    const res = await axios.post(`${BASE_URL}/api/ai/ask`,"Explain microservices in simple words",
      {
        headers:{
          "Content-Type":"text/plain"
        }
      }
    );
    console.log("AI Response --> ",res.data);
    return res.data;
  }
  catch(err)
  {
  console.log("AI Error" , err);
  }

};