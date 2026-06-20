import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", form);

      alert("✅ Registration Successful! Please login to continue.");

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("❌ Registration Failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
  type="text"
  placeholder="Name"
  value={form.name}
  onChange={(e) =>
    setForm({ ...form, name: e.target.value })
  }
  required
/>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
        required
      />

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;


