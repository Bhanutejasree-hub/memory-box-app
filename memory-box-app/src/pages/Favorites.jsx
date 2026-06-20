import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Favorites() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    const res = await api.get("/memories");
    setFavorites(res.data.filter((m) => m.favorite));
  };

  useEffect(() => {
    // 🔐 BLOCK ACCESS IF NOT LOGGED IN
    if (!user) {
      alert("⚠️ Please login first to view Favorites");
      navigate("/login");
      return;
    }

    fetchFavorites();
  }, [user]);

  const removeFavorite = async (memory) => {
    await api.put(`/memories/${memory.id}`, {
      ...memory,
      favorite: false,
    });

    fetchFavorites();
  };

  return (
    <div>
      <h2>⭐ Favorite Memories</h2>

      <div className="memory-grid">
        {favorites.map((m) => (
          <div key={m.id} className="memory-card">
            <img
              src={m.image}
              alt={m.title}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/300x200?text=No+Image")
              }
            />

            <h3>{m.title}</h3>

            <p>{m.description}</p>

            <Link to={`/memory/${m.id}`}>
              <button className="edit">
                View Details
              </button>
            </Link>

            <button
              className="delete"
              onClick={() => removeFavorite(m)}
            >
              Remove ⭐
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
