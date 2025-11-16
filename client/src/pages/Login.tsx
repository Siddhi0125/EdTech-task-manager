import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      // auth context expects (token, user)
      login(res.data.token, res.data.user);
      window.location.href = "/dashboard";
    } catch (err: any) {
      alert(err.response.data.message || "Login failed");
    }
  };

  return (
    <div style={{ margin: 40 }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })}
        /><br/>

        <input
          type="password"
          placeholder="Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: e.target.value })}
        /><br/>

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <a href="/signup">Signup</a></p>
    </div>
  );
};

export default Login;
