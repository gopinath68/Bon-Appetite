import React from "react";
import { useNavigate } from "react-router-dom";

function Recents() {
  const navigate = useNavigate();
  return (
    <div>
      <div>Recents Pages</div>
      <button onClick={() => navigate("/add-recipie")}>newReceipe</button>
      <button onClick={() => navigate("/favoraties")}>Go to Favoraties</button>
    </div>
  );
}

export default Recents;
