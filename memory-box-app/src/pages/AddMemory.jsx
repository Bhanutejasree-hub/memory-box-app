import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddMemory() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
    category: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/memories", {
        ...form,
        favorite: false,
      });

      alert("✅ Memory added successfully!");

      setForm({
        title: "",
        description: "",
        image: "",
        date: "",
        category: "",
      });

      navigate("/memories");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add memory. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Memory</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />

      <button type="submit">
        Add Memory
      </button>
    </form>
  );
}

export default AddMemory;
