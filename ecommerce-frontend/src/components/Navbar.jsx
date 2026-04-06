import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar({ isLoggedIn, setIsLoggedIn , role , setRole }) {
  return (
    <nav className="navbar">
      <div className="logo">
        Grocessary<span>Application</span>
      </div>

<div className="nav-links">
  <Link to="/">Home</Link>
  {/* <Link to="/products">Products</Link> */}
  <Link to = "/">Products</Link>
  <Link to="/cart">Cart</Link>

  {!isLoggedIn ? (
    <>
      <Link to="/login">Login</Link>
      <Link to="/signup">Register</Link>
    </>
  ) : (
    <>
      {role === "ADMIN" && (
        <Link to="/admin">Admin Access</Link>
      )}

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("isLoggedIn");

          setIsLoggedIn(false);
          setRole(null);
        }}
      >
        Logout
      </button>
    </>
  )}
</div>
    </nav>
  );
}

export default Navbar;

// const styles = {
//   nav: {
//     display: "flex",
//     justifyContent: "space-between",
//     padding: "15px 30px",
//     background: "#1976d2",
//     color: "white"
//   }
// };

