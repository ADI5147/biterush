import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setUser }) {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/", { replace: true });
  }, [setUser, navigate]);
  return <div style={{ textAlign: "center", marginTop: 60 }}>Logging out...</div>;
}

export default Logout;