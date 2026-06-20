import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Memories from "../pages/Memories";
import AddMemory from "../pages/AddMemory";
import MemoryDetails from "../pages/MemoryDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Favorites from "../pages/Favorites";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/memories"
        element={
          <ProtectedRoute>
            <Memories />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddMemory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/memory/:id"
        element={
          <ProtectedRoute>
            <MemoryDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;