import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // clear user from context + localStorage
    navigate("/login"); // redirect to login page
  }, []);

  return (
    <div className="logout-container">
      <h2>Logging you out...</h2>
    </div>
  );
}

export default Logout;