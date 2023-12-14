import React, { useState } from "react";
import "./login.scss";
import { publicRequest } from "../../utils/request";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await publicRequest.post("/auth/login", {
        username,
        password
      });

      if (res.data) {
        localStorage.setItem("fiverUser", JSON.stringify(res.data));
        navigate("/", { state: { refresh: 'true' } });
      }
    } catch (err) {
      setError(err.response?.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="john doe"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <span style={{ color: 'red' }}>{error}</span>}
        <p style={{ textAlign: 'center' }}>{`Don't have an account? `} <Link to={'/register'} className="link">register now</Link></p>
      </form>
    </div>
  );
}

export default Login;