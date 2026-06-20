import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditMemory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
    category: "",
    favorite: false
  });

  useEffect(() => {
    api.get(`/memories/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.put(`/memories/${id}`, form);

    navigate("/memories");
  };

  return (
    <div>
      <h2>Edit Memory</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
        />

        <label>
          <input
            type="checkbox"
            name="favorite"
            checked={form.favorite}
            onChange={handleChange}
          />
          Mark as Favorite
        </label>

        <button type="submit">Update Memory</button>
      </form>
    </div>
  );
}

export default EditMemory;