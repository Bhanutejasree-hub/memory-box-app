import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function MemoryDetails() {
  const { id } = useParams();
  const [memory, setMemory] = useState(null);

  useEffect(() => {
    api.get(`/memories/${id}`).then((res) => setMemory(res.data));
  }, [id]);

  if (!memory) return <p>Loading...</p>;

  return (
    <div>
      <h2>{memory.title}</h2>
      <img src={memory.image} width="300" />
      <p>{memory.description}</p>
      <p>{memory.date}</p>
    </div>
  );
}

export default MemoryDetails;