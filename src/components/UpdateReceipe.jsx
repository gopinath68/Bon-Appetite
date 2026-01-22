import React from "react";
import { useContext } from "react";
import { FaRegEdit } from "react-icons/fa";
import { ReceipeContext } from "../context/ReceipeContext";
import { IconButton } from "./ReceipeCards";

function UpdateReceipe({ receipe }) {
  const { setIsSidePanelOpen, setAddReceipe } = useContext(ReceipeContext);

  const editReceipeHandler = (recipie) => {
    console.log(recipie);
    setAddReceipe(recipie);
    setIsSidePanelOpen(true);
  };
  return (
    <div>
      <IconButton onClick={() => editReceipeHandler(receipe)}>
        <FaRegEdit />
      </IconButton>
    </div>
  );
}

export default UpdateReceipe;
