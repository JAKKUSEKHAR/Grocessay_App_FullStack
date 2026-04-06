import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchProducts,
} from "../../api/productApi";
import { deleteProduct } from "../../api/adminApi";
import "./admin.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <div className="admin-page">
      <h2>Manage Products</h2>

      <button onClick={() => navigate("/admin")}>⬅ Back</button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.quantity}</td>
              <td>{p.categoryName}</td>
              <td>
                <button
                  onClick={() =>
                    navigate(`/admin/products/edit/${p.id}`)
                  }
                >
                  Update
                </button>

                <button
                  className="danger"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;