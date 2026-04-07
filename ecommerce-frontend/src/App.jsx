import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { fetchProducts } from "./api/productApi";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/Admin/AddProduct";
import AdminRoute from "./pages/Admin/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProducts from "./pages/Admin/AdminProducts";
import UpdateProduct from "./pages/Admin/UpdateProduct";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  //  FETCH PRODUCTS ONCE
  useEffect(() => {
    fetchProducts().then(data => {
      const withQty = data.map(p => ({
        ...p,
        qty: 0,
        category: p.categoryName
      }));
      console.log(" Data Loaded SuccessFully" , withQty);
      setProducts(withQty);
    });
  }, []);

  const increaseQty = (id) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id && p.qty < 5
          ? { ...p, qty: p.qty + 1 }
          : p
      )
    );
  };

  const decreaseQty = (id) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id && p.qty > 0
          ? { ...p, qty: p.qty - 1 }
          : p
      )
    );
  };

  const clearCart = () => {
  setProducts(prev =>
    prev.map(p => ({ ...p, qty: 0 }))
  );
};

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedRole = localStorage.getItem("role");
    setIsLoggedIn(loggedIn);
    setRole(storedRole);
    console.log("rending along with the fetch products")
  }, []);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
    console.log("it wont render every time")
  }, [isLoggedIn, role]);

  return (
    <BrowserRouter>
           
    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} setRole={setRole} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              products={products}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              clearCart={clearCart}
               isLoggedIn={isLoggedIn}
            />
          }
        />
        
        <Route path="/orders" element={<Orders />} />

        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
         <Route path="/signup" element={<Signup />} />       
 
    <Route
        path="/admin"
        element={
           <AdminRoute role={role}>
               <AdminDashboard />
           </AdminRoute>
               } 
    />
 
    <Route
        path="/admin/add-product"
        element={
       <AdminRoute role={role}>
           <AddProduct />
       </AdminRoute>
                }
    />
          
<Route path="/admin/products" element={<AdminProducts />} />
<Route path="/admin/products/edit/:id" element={<UpdateProduct />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;


// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import Orders from "./pages/Orders";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";   // previously here SignUp was there instead of Signup

// import { fetchProducts } from "./api/productApi";

// function App() {
//   const [products, setProducts] = useState([]);
//   const token = localStorage.getItem("token");

//   // Fetch products ONLY after login
// useEffect(() => {
//   // if (token) {
//     fetchProducts()
//       .then(data => {
//         const withQty = data.map(p => ({
//           ...p,
//           qty: 0,
//           category: p.categoryName
//         }));
//         setProducts(withQty);
//       })
//       .catch(err => {
//         console.error("PRODUCT FETCH ERROR:", err);
//       });
//   // }
// }, []);
// // [token]


//   const increaseQty = (id) => {
//     setProducts(prev =>
//       prev.map(p =>
//         p.id === id && p.qty < 5
//           ? { ...p, qty: p.qty + 1 }
//           : p
//       )
//     );
//   };

//   const decreaseQty = (id) => {
//     setProducts(prev =>
//       prev.map(p =>
//         p.id === id && p.qty > 0
//           ? { ...p, qty: p.qty - 1 }
//           : p
//       )
//     );
//   };

//   return (
//     <BrowserRouter>
//       <Routes>

//         {/*  PUBLIC ROUTES */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/*  PROTECTED ROUTES */}
//         <Route
//           path="/"
//           element={
//             token ? (
//               <Home
//                 products={products}
//                 increaseQty={increaseQty}
//                 decreaseQty={decreaseQty}
//               />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />

//         <Route
//           path="/cart"
//           element={
//             token ? (
//               <Cart
//                 products={products}
//                 increaseQty={increaseQty}
//                 decreaseQty={decreaseQty}
//               />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />

//         <Route
//           path="/orders"
//           element={token ? <Orders /> : <Navigate to="/login" />}
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
