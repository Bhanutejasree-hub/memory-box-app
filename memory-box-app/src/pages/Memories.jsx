import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import MemoryCard from "../components/MemoryCard";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Memories() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [memories, setMemories] = useState([]);
  const [search, setSearch] = useState("");

  const fetchMemories = async () => {
    const res = await api.get("/memories");
    setMemories(res.data);
  };

  useEffect(() => {
    // 🔐 BLOCK ACCESS IF NOT LOGGED IN
    if (!user) {
      alert("⚠️ Please login first to view Memories");
      navigate("/login");
      return;
    }

    fetchMemories();
  }, [user]);

  const filteredMemories = memories.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>📸 Memories</h2>

      <input
        type="text"
        placeholder="Search Memories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          margin: "10px 0",
          width: "100%",
          maxWidth: "400px",
        }}
      />

      <div className="memory-grid">
        {filteredMemories.map((m) => (
          <MemoryCard
            key={m.id}
            memory={m}
            refresh={fetchMemories}
          />
        ))}
      </div>
    </div>
  );
}

export default Memories;
