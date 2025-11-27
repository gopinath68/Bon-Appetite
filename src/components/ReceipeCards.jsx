import React, { useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ReceipeContext } from "../context/ReceipeContext";
import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa6";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import UpdateReceipe from "./Updatereceipe";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }

  svg {
    font-size: 20px;
    color: #333;
  }
`;

function ReceipeCards({ recipes }) {
  const navigate = useNavigate();
  const toast = useRef(null);
  const { selectedRecipie, setSelectedRecipie, setRecipies, recipies } =
    useContext(ReceipeContext);
  const [deleteReceipe, setDeleteReceipe] = useState(null);
  const [
    isDeleteRecipieConfirmDialogOpen,
    setIsDeleteRecipieConfirmDialogOpen,
  ] = useState(false);

  const { addReceipe, setAddReceipe, isSidePanelOpen, setIsSidePanelOpen } =
    useContext(ReceipeContext);

  useEffect(() => {
    if (selectedRecipie) {
      navigate(`/recipie/${selectedRecipie.name}`);
    }
  }, [selectedRecipie]);

  const viewReceipeHandler = (recipie) => {
    console.log(recipie);

    setSelectedRecipie(recipie);
  };
  const handleReceipeDelete = (recipie) => {
    fetch(`http://localhost:3003/receipes/${recipie.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(recipie.name, "Resource deleted successfully.");
          const updatedReceipes = recipies.filter(
            (item) => item.id !== recipie.id
          );
          toast.current.show({
            severity: "sucess",
            summary: "deletion",
            detail: " receipe hasbeen deleted",
            life: 3000,
          });
          setRecipies(updatedReceipes);
        } else {
          console.error("Failed to delete resource:", response.statusText);
          throw new Error("Failed to delete resource");
        }
      })
      .catch((error) => {
        console.error("Error during DELETE request:", error);
      });
    setIsDeleteRecipieConfirmDialogOpen(false);
  };

  const reject = () => {
    setIsDeleteRecipieConfirmDialogOpen(false);
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const onReceipeDelete = (recipie) => {
    setIsDeleteRecipieConfirmDialogOpen(true);
    setDeleteReceipe(recipie);
  };

  const favorateHandler = (receipe) => {
    console.log("receipeId: ", receipe.id, receipe.favorite);
    fetch(`http://localhost:3003/receipes/${receipe.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorite: !receipe.favorite }),
    })
      .then((res) => res.json())
      .then((updated) => {
        console.log("Updated favorite:", updated);
        const updateFavorite = recipies.map((item) =>
          item.id === receipe.id ? updated : item
        );
        toast.current.show({
          severity: "Info",
          summary: "Info",
          detail: updated.favorite === true ? "favorated" : "unfavorated",
          life: 3000,
        });
        setRecipies(updateFavorite);
      })
      .catch((err) => {
        console.error("Error updating favorite", err);
      });
  };

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog
        {...{
          message: (
            <span>
              Are you sure you want to delete{" "}
              <h4 style={{ color: "black" }}>{deleteReceipe?.name}?</h4>
            </span>
          ),
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          defaultFocus: "accept",
          accept: () => handleReceipeDelete(deleteReceipe),
          reject,
          visible: isDeleteRecipieConfirmDialogOpen,
        }}
      />

      {recipes.length > 0 ? (
        <div className="cards">
          {recipes.map((recipie) => (
            <div key={recipie.id} className="card">
              <div>
                <img
                  src={recipie.image}
                  alt="Avatar"
                  style={{ width: "100%", cursor: "pointer" }}
                  onClick={() => viewReceipeHandler(recipie)}
                />
                <div className="container">
                  <b className="receipeName">{recipie.name}</b>
                  <div className="receipesCatogery">
                    <b>{recipie.category?.[0] || ""}</b>
                  </div>
                  <div className="nutrition">
                    <b>Nutritions</b>
                    <div>
                      <span>Calories: {recipie.nutrition.calories}</span>
                      <span>Protein: {recipie.nutrition.protein}</span>
                    </div>
                    <div>
                      <span>Carbs: {recipie.nutrition.carbs}</span>
                      <span>Fat: {recipie.nutrition.fat}</span>
                    </div>
                  </div>
                </div>
                <div className="cardFooter">
                  <IconButton onClick={() => favorateHandler(recipie)}>
                    <FaRegHeart
                      color={recipie.favorite ? "white" : "black"}
                      className={`"favorities" ${
                        recipie.favorite ? "Favorated" : ""
                      }`}
                    />
                  </IconButton>
                  <UpdateReceipe receipe={recipie} />
                  <IconButton onClick={() => viewReceipeHandler(recipie)}>
                    <GrFormView />
                  </IconButton>
                  <IconButton onClick={() => onReceipeDelete(recipie)}>
                    <MdDelete />
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="NotFound">
          <h3>Receipes Not Found</h3>
        </div>
      )}
    </div>
  );
}

export default ReceipeCards;
