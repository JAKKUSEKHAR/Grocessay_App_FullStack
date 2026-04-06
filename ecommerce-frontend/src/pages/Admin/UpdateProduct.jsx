import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../../api/productApi";
import { updateProduct } from "../../api/adminApi";
import "./admin.css";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    imageName: "",
    categoryId: ""
  });

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const data = await fetchProductById(id);
    setForm({
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      description: data.description,
      imageName: data.imageName,
      categoryId: data.categoryId
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(id, form);
    alert("Product updated");
    navigate("/admin/products");
  };

  return (
    <div className="admin-page">
      <h2>Update Product</h2>

      <button onClick={() => navigate("/admin/products")}>
        ⬅ Back
      </button>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Stock Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <input
          name="imageName"
          placeholder="Image Name"
          value={form.imageName}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="categoryId"
          placeholder="Category ID"
          value={form.categoryId} 
        //    value={form.categoryName}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default UpdateProduct;