import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authApi";

function Login({setIsLoggedIn , setRole}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser({ username, password });

    const { role, token } = res;

    // Save role
    localStorage.setItem("role", role);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userId", res.userId);

    // Save token ONLY if ADMIN
    if (role === "ADMIN" && token) {
      localStorage.setItem("token", token);
    }

    setIsLoggedIn(true);
    setRole(role);

    navigate("/");
  } catch (err) {
    console.error(err);
    alert("Invalid username or password");
  }
};

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p>
          New user? <Link to="/signup">Create account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
