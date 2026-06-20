import api from "../services/api";
import { Link } from "react-router-dom";

function MemoryCard({ memory, refresh }) {
  const toggleFavorite = async () => {
    await api.put(`/memories/${memory.id}`, {
      ...memory,
      favorite: !memory.favorite,
    });

    refresh();
  };

  const deleteMemory = async () => {
    await api.delete(`/memories/${memory.id}`);
    refresh();
  };

  return (
    <div className="memory-card">
      <img
        src={
          memory.image ||
          "https://via.placeholder.com/300x200?text=No+Image"
        }
        alt={memory.title}
        onError={(e) =>
          (e.target.src =
            "https://via.placeholder.com/300x200?text=Image+Error")
        }
      />

      <h3>
        {memory.title} {memory.favorite && "⭐"}
      </h3>

      <p>{memory.description}</p>

      <button className="edit" onClick={toggleFavorite}>
        {memory.favorite
          ? "Remove Favorite"
          : "Add Favorite"}
      </button>

      <Link to={`/memory/${memory.id}`}>
        <button>Edit/View</button>
      </Link>

      <button className="delete" onClick={deleteMemory}>
        Delete
      </button>
    </div>
  );
}

export default MemoryCard;
