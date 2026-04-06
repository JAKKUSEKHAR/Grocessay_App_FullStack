import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import CategoryStrip from "../components/CategoryStrip";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { fetchCategories } from "../api/productApi";

function Home({ increaseQty, decreaseQty, products, setProducts }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);

//   useEffect(() => {
//   console.log("HOME products:", products);
// }, [products]);         //// ////////////
  console.log("Home.jsx")
useEffect(() => {
  fetchCategories().then(data => {
    setCategories(["All", ...data.map(c => c.name)]);
  });
}, []);


  const filteredProducts = products.filter(p => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    const matchesSearch =
      p.name.toLowerCase().includes(searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const totalItems = products.reduce((sum, p) => sum + p.qty, 0);
  const totalPrice = products.reduce((sum, p) => sum + p.qty * p.price, 0);

  return (
    <div className="app-shell">
      <TopBar searchText={searchText} onSearch={setSearchText} />

      <CategoryStrip
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="grid">
        {filteredProducts.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={() => increaseQty(p.id)}
            onRemove={() => decreaseQty(p.id)}
          />
        ))}
      </div>

      {totalItems > 0 && (
        <div className="cart-bar">
          <div>
            <strong>{totalItems} items</strong>
            <div className="cart-price">₹{totalPrice}</div>
          </div>
<Link to="/cart" className="view-cart">
  View Cart
</Link>
        </div>
      )}
    </div>
  );
}

export default Home;
