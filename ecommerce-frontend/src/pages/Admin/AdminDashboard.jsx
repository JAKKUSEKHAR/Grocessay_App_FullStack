import { Link } from "react-router-dom";
import "./admin.css";

function AdminDashboard() {
  return (
    <div className="admin-wrapper">

      <div className="admin-header">
        <h2>Admin Dashboard</h2>
      </div>

      <div className="dashboard-container">

        {/* ADD PRODUCT */}
        <Link to="/admin/add-product" className="dashboard-card">
          <h3>Add Product</h3>
          <p>Create new products</p>
        </Link>

        {/* MANAGE PRODUCTS (UPDATE + DELETE + STOCK) */}
        <Link to="/admin/products" className="dashboard-card">
          <h3>Manage Products</h3>
          <p>Update, delete & manage stock</p>
        </Link>

        {/* FUTURE FEATURE */}
        <div className="dashboard-card disabled">
          <h3>Delivery Boys</h3>
          <p>Enable when delivery system is added</p>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;