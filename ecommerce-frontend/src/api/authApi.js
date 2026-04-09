// import axios from "axios";

// export const login = async (data) => {
//   const res = await axios.post(
//     "http://localhost:8080/api/auth/login",
//     data,
//     {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     }
//   );
//   return res.data;
// };

import axios from "axios";

const BASE_URL = "https://ecommerce-backend-latest-d0jt.onrender.com/api/auth";

export const loginUser = async (data) => {
  const res = await axios.post(
    `${BASE_URL}/login`,
    data,
    // {
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // }
  );
  console.log(res.data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(
    `${BASE_URL}/register`,
    data,
    // {
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // }
  );
  return res.data;
};
