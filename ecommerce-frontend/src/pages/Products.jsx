import { useEffect, useState } from "react";
// import { getAllProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../api/productApi";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("Products Page Loaded"); 
    fetchProducts()
      .then(data => {
        console.log("Products:", data); 
        setProducts(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px"
        }}
      >
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
