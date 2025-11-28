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
<<<<<<< HEAD
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

=======
import { ConfirmDialog } from "primereact/confirmdialog";

/* Styled IconButton kept nearly same as your original */
>>>>>>> origin/main
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

<<<<<<< HEAD
=======
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

>>>>>>> origin/main
  svg {
    font-size: 20px;
    color: #333;
  }
`;

<<<<<<< HEAD
=======
/* Loader overlay / spinner */
const PageLoader = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.85);
  flex-direction: column;
  gap: 12px;
`;

const Spinner = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 6px solid rgba(0, 0, 0, 0.12);
  border-top-color: rgba(0, 0, 0, 0.65);
  animation: spin 0.9s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const SmallOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 800;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* Keep existing markup structure but show loader states appropriately */
>>>>>>> origin/main
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

<<<<<<< HEAD
=======
  // Local loading flags:
  // - pageLoading: when recipes prop is null/undefined (parent fetching)
  // - opLoading: during delete / patch network operations
  const [pageLoading, setPageLoading] = useState(recipes == null);
  const [opLoading, setOpLoading] = useState(false);

  useEffect(() => {
    // If parent passes recipes later, hide the page loader
    setPageLoading(recipes == null);
  }, [recipes]);

>>>>>>> origin/main
  useEffect(() => {
    if (selectedRecipie) {
      navigate(`/recipie/${selectedRecipie.name}`);
    }
  }, [selectedRecipie]);

  const viewReceipeHandler = (recipie) => {
<<<<<<< HEAD
    console.log(recipie);

    setSelectedRecipie(recipie);
  };
  const handleReceipeDelete = (recipie) => {
=======
    setSelectedRecipie(recipie);
  };

  const handleReceipeDelete = (recipie) => {
    if (!recipie) return;
    setOpLoading(true);
>>>>>>> origin/main
    fetch(`http://localhost:3003/receipes/${recipie.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
<<<<<<< HEAD
          console.log(recipie.name, "Resource deleted successfully.");
=======
          // update local list (context)
>>>>>>> origin/main
          const updatedReceipes = recipies.filter(
            (item) => item.id !== recipie.id
          );
          toast.current.show({
<<<<<<< HEAD
            severity: "sucess",
            summary: "deletion",
            detail: " receipe hasbeen deleted",
=======
            severity: "success",
            summary: "Deletion",
            detail: "Receipe has been deleted",
>>>>>>> origin/main
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
<<<<<<< HEAD
      });
=======
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to delete receipe",
          life: 3000,
        });
      })
      .finally(() => {
        setOpLoading(false);
      });

>>>>>>> origin/main
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
<<<<<<< HEAD
    console.log("receipeId: ", receipe.id, receipe.favorite);
=======
    if (!receipe) return;
    setOpLoading(true);
>>>>>>> origin/main
    fetch(`http://localhost:3003/receipes/${receipe.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorite: !receipe.favorite }),
    })
      .then((res) => res.json())
      .then((updated) => {
<<<<<<< HEAD
        console.log("Updated favorite:", updated);
=======
>>>>>>> origin/main
        const updateFavorite = recipies.map((item) =>
          item.id === receipe.id ? updated : item
        );
        toast.current.show({
<<<<<<< HEAD
          severity: "Info",
          summary: "Info",
          detail: updated.favorite === true ? "favorated" : "unfavorated",
=======
          severity: "info",
          summary: "Info",
          detail: updated.favorite === true ? "favorited" : "unfavorited",
>>>>>>> origin/main
          life: 3000,
        });
        setRecipies(updateFavorite);
      })
      .catch((err) => {
        console.error("Error updating favorite", err);
<<<<<<< HEAD
      });
  };

  return (
    <div>
=======
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to update favorite",
          life: 3000,
        });
      })
      .finally(() => {
        setOpLoading(false);
      });
  };

  // Render
  // If parent is still fetching (recipes is null/undefined), show page loader
  if (pageLoading) {
    return (
      <>
        <Toast ref={toast} />
        <PageLoader aria-live="polite">
          <Spinner />
          <div>Loading recipes…</div>
        </PageLoader>
      </>
    );
  }

  return (
    <div style={{ position: "relative" }}>
>>>>>>> origin/main
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

<<<<<<< HEAD
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
=======
      {/* Show small overlay spinner during any network operation */}
      {opLoading && (
        <SmallOverlay aria-hidden={false}>
          <Spinner />
        </SmallOverlay>
      )}

      {recipes && recipes.length > 0 ? (
        <div className="cards">
          {recipes.map((recipie) => (
            <div
              key={recipie.id}
              className="card"
              style={{ position: "relative" }}
            >
              <div>
                <img
                  className={`"image"${recipie.image ? "" : " loader"}`}
                  src={recipie.image}
                  alt={recipie.name || "Receipe image"}
                  onClick={() => viewReceipeHandler(recipie)}
                  style={{ cursor: opLoading ? "not-allowed" : "pointer" }}
>>>>>>> origin/main
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
<<<<<<< HEAD
                <div className="cardFooter">
                  <IconButton onClick={() => favorateHandler(recipie)}>
=======
                <div className="cardFooter" style={{ display: "flex", gap: 8 }}>
                  <IconButton
                    onClick={() => favorateHandler(recipie)}
                    disabled={opLoading}
                    aria-label="favorite"
                  >
>>>>>>> origin/main
                    <FaRegHeart
                      color={recipie.favorite ? "white" : "black"}
                      className={`"favorities" ${
                        recipie.favorite ? "Favorated" : ""
                      }`}
                    />
                  </IconButton>
<<<<<<< HEAD
                  <UpdateReceipe receipe={recipie} />
                  <IconButton onClick={() => viewReceipeHandler(recipie)}>
                    <GrFormView />
                  </IconButton>
                  <IconButton onClick={() => onReceipeDelete(recipie)}>
=======

                  <UpdateReceipe receipe={recipie} disabled={opLoading} />

                  <IconButton
                    onClick={() => viewReceipeHandler(recipie)}
                    disabled={opLoading}
                    aria-label="view"
                  >
                    <GrFormView />
                  </IconButton>

                  <IconButton
                    onClick={() => onReceipeDelete(recipie)}
                    disabled={opLoading}
                    aria-label="delete"
                  >
>>>>>>> origin/main
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
