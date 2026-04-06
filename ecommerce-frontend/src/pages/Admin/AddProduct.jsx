import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../api/adminApi";
import { fetchCategories } from "../../api/productApi";
import "./admin.css";

function AddProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    imageName: ""
  });

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  }; 


  const handleSubmit = async (e) => {
    e.preventDefault();
    
             if(product.price<500 )
            {
           await addProduct({
      ...product,
      price:   Number(product.price),
      quantity: Number(product.quantity),
      categoryId: Number(product.categoryId)
    }); 
    console.log(categories.name);
            }   
            else if(product.price>=500 && categories.id===product.categoryId){  
              console.log("testing");
             alert("product price shoiuld be less than 500")
                console.log("testung");
            }
      
    navigate("/admin");
  };

  return (
    <div className="admin-wrapper">

      <div className="admin-header">
        <h2>Add Product</h2>
        <button
          className="admin-back-btn"
          onClick={() => navigate("/admin")}
        >
          Back
        </button>
      </div>

      <div className="form-box">
        <form className="form-grid" onSubmit={handleSubmit}>

          <label>Product Name</label>
          <input name="name" value={product.name} onChange={handleChange} required />

          <label>Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} required />

          <label>Price</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />

          <label>Quantity</label>
          <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />

          <label>Category</label>
          <select name="categoryId" value={product.categoryId} onChange={handleChange} required>
            <option value="">-- Select Category --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <label>Image Name</label>
          <input name="imageName" value={product.imageName} onChange={handleChange} />

          <button type="submit" className="form-submit">
            Add Product
          </button>

        </form>
      </div>

    </div>
  );
}

export default AddProduct;