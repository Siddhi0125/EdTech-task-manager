import { useState } from "react";
import { signup } from "../api/authApi";

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
    teacherId: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signup(form);
      alert("Signup successful. Please login.");
      window.location.href = "/";
    } catch (err: any) {
      alert(err.response.data.message || "Signup failed");
    }
  };

  return (
    <div style={{ margin: 40 }}>
      <h2>Signup</h2>

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

        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, role: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select><br/>

        {form.role === "student" && (
          <input
            placeholder="Teacher ID"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, teacherId: e.target.value })}
          />
        )}
        <br/>

        <button type="submit">Signup</button>
      </form>

      <p>Already registered? <a href="/">Login</a></p>
    </div>
  );
};

export default Signup;
