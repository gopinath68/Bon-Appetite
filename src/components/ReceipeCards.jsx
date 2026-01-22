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
import { ConfirmDialog } from "primereact/confirmdialog";

/* ================= styled ================= */

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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  svg {
    font-size: 20px;
    color: #333;
  }
`;

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

const SmallSpinner = styled(Spinner)`
  width: 32px;
  height: 32px;
  border-width: 4px;
`;

/* simple CSS for skeleton shimmer - using inline style below */
const skeletonStyle = {
  width: "100%",
  height: 180,
  borderRadius: 6,
  background: "linear-gradient(90deg, #f2f2f2 25%, #e9e9e9 37%, #f2f2f2 63%)",
  backgroundSize: "400% 100%",
  animation: "shimmer 1.2s ease-in-out infinite",
};

/* ================= component ================= */

function ReceipeCards({ recipes }) {
  const navigate = useNavigate();
  const toast = useRef(null);

  const { selectedRecipie, setSelectedRecipie, deleteRecipe, updateRecipe } =
    useContext(ReceipeContext);

  const [deleteReceipe, setDeleteReceipe] = useState(null);
  const [
    isDeleteRecipieConfirmDialogOpen,
    setIsDeleteRecipieConfirmDialogOpen,
  ] = useState(false);

  const [pageLoading, setPageLoading] = useState(recipes === null);

  useEffect(() => {
    setPageLoading(recipes === null);
  }, [recipes]);

  useEffect(() => {
    if (selectedRecipie) {
      navigate(`/recipie/${selectedRecipie.name}`);
    }
  }, [selectedRecipie, navigate]);

  const viewReceipeHandler = (recipie) => {
    setSelectedRecipie(recipie);
  };

  /* ================= card ================= */

  const RecipeCard = ({ recipie }) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [opLoading, setOpLoading] = useState(false);

    // Ensure image shows a placeholder for at least minPlaceholderMs to avoid flicker
    const imgLoadStartRef = useRef(0);
    const minPlaceholderMs = 220;

    useEffect(() => {
      // reset when the card changes (either id or image url)
      setImgLoaded(false);
      setImgError(!recipie?.image);
      imgLoadStartRef.current = Date.now();
    }, [recipie?.id, recipie?.image]);

    const favorateHandler = () => {
      setOpLoading(true);
      try {
        updateRecipe({ ...recipie, favorite: !recipie.favorite });
        toast.current.show({
          severity: "info",
          summary: "Info",
          detail: recipie.favorite ? "unfavorited" : "favorited",
          life: 3000,
        });
      } finally {
        setOpLoading(false);
      }
    };

    const handleImgLoad = () => {
      const elapsed = Date.now() - imgLoadStartRef.current;
      const remaining = Math.max(0, minPlaceholderMs - elapsed);
      if (remaining > 0) {
        setTimeout(() => setImgLoaded(true), remaining);
      } else {
        setImgLoaded(true);
      }
    };

    const handleImgError = () => {
      setImgError(true);
      setImgLoaded(false);
    };

    return (
      <div className="card" style={{ position: "relative" }}>
        <div>
          <div style={{ position: "relative" }}>
            {/* skeleton shimmer while loading */}
            {!imgLoaded && !imgError && (
              <div style={skeletonStyle} aria-hidden />
            )}

            {imgError ? (
              <div
                style={{
                  width: "100%",
                  height: 180,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f2f2f2",
                  borderRadius: 6,
                }}
              >
                Image unavailable
              </div>
            ) : (
              <img
                key={`${recipie.id}-${recipie.image}`}
                src={recipie.image}
                loading="lazy"
                alt={recipie.name || "Receipe image"}
                onClick={() => viewReceipeHandler(recipie)}
                onLoad={handleImgLoad}
                onError={handleImgError}
                style={{
                  cursor: opLoading ? "not-allowed" : "pointer",
                  opacity: imgLoaded ? 1 : 0,
                  transition: "opacity 0.28s ease",
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 6,
                  display: imgLoaded ? "block" : "block",
                }}
              />
            )}

            <div className="container">
              <b className="receipeName">{recipie.name}</b>
              <div className="receipesCatogery">
                <b>{recipie.category?.[0] || ""}</b>
              </div>
              <div className="nutrition">
                <b>Nutritions</b>
                <div>
                  <span>Calories: {recipie.nutrition?.calories ?? "-"}</span>
                  <span>Protein: {recipie.nutrition?.protein ?? "-"}</span>
                </div>
                <div>
                  <span>Carbs: {recipie.nutrition?.carbs ?? "-"}</span>
                  <span>Fat: {recipie.nutrition?.fat ?? "-"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cardFooter" style={{ display: "flex", gap: 8 }}>
            <IconButton
              onClick={favorateHandler}
              disabled={opLoading}
              aria-label="favorite"
            >
              <FaRegHeart
                className={`favorities ${recipie.favorite ? "Favorated" : ""}`}
              />
            </IconButton>

            <UpdateReceipe receipe={recipie} disabled={opLoading} />

            <IconButton
              onClick={() => viewReceipeHandler(recipie)}
              disabled={opLoading}
            >
              <GrFormView />
            </IconButton>

            <IconButton
              onClick={() => {
                setDeleteReceipe(recipie);
                setIsDeleteRecipieConfirmDialogOpen(true);
              }}
              disabled={opLoading}
            >
              <MdDelete />
            </IconButton>
          </div>
        </div>
      </div>
    );
  };

  /* ================= render ================= */

  if (pageLoading) {
    // Show a grid of skeleton card placeholders while data is loading
    const placeholders = Array.from({ length: 12 });
    return (
      <div className="cards">
        <Toast ref={toast} />
        {placeholders.map((_, idx) => (
          <div
            key={`ph-${idx}`}
            className="card"
            style={{ position: "relative" }}
          >
            <div>
              <div style={{ position: "relative" }}>
                <div style={skeletonStyle} aria-hidden />
                <SmallOverlay aria-hidden>
                  <SmallSpinner />
                </SmallOverlay>
                <div className="container">
                  <b className="receipeName">Loading…</b>
                  <div className="receipesCatogery">
                    <b>—</b>
                  </div>
                  <div className="nutrition">
                    <b>Nutritions</b>
                    <div>
                      <span>Calories: —</span>
                      <span>Protein: —</span>
                    </div>
                    <div>
                      <span>Carbs: —</span>
                      <span>Fat: —</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cardFooter" style={{ display: "flex", gap: 8 }}>
                <IconButton disabled aria-label="favorite">
                  <FaRegHeart />
                </IconButton>
                <IconButton disabled aria-label="view">
                  <GrFormView />
                </IconButton>
                <IconButton disabled aria-label="delete">
                  <MdDelete />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <Toast ref={toast} />

      <ConfirmDialog
        visible={isDeleteRecipieConfirmDialogOpen}
        message={`Delete ${deleteReceipe?.name}?`}
        header="Confirmation"
        accept={() => deleteRecipe(deleteReceipe.id)}
        reject={() => setIsDeleteRecipieConfirmDialogOpen(false)}
      />

      {recipes && recipes.length > 0 ? (
        <div className="cards">
          {recipes.map((recipie) => (
            <RecipeCard key={recipie.id} recipie={recipie} />
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
