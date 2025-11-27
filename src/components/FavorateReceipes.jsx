import React from "react";
import { useNavigate } from "react-router-dom";

function FavorateReceipes() {
  const navigate = useNavigate();
  return (
    <div>
      <div>Favoraties page</div>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
}

export default FavorateReceipes;
