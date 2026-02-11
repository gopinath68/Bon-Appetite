import React, {
  useEffect,
  useContext,
  useState,
  useRef,
  memo,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { ReceipeContext } from "../context/ReceipeContext";
import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa6";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import UpdateReceipe from "./UpdateReceipe";
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
    background-color: rgba(255, 111, 0, 0.1);
    color: #ff6f00;
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

const SmallOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 800;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 4px solid rgba(0, 0, 0, 0.12);
  border-top-color: rgba(0, 0, 0, 0.65);
  animation: spin 0.9s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const skeletonStyle = {
  width: "100%",
  height: 180,
  borderRadius: 16,
  background: "linear-gradient(90deg, #f2f2f2 25%, #e9e9e9 37%, #f2f2f2 63%)",
  backgroundSize: "400% 100%",
  animation: "shimmer 1.2s ease-in-out infinite",
};

/* ================= Memoized Recipe Card ================= */

const RecipeCard = memo(function RecipeCard({
  recipie,
  onFavorite,
  onView,
  onDelete,
  onUpdate,
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [opLoading, setOpLoading] = useState(false);
  const imgLoadStartRef = useRef(0);
  const minPlaceholderMs = 220;

  useEffect(() => {
    setImgLoaded(false);
    setImgError(!recipie?.image);
    imgLoadStartRef.current = Date.now();
  }, [recipie?.id, recipie?.image]);

  const favorateHandler = () => {
    setOpLoading(true);
    try {
      onFavorite({ ...recipie, favorite: !recipie.favorite });
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
          {!imgLoaded && !imgError && <div style={skeletonStyle} aria-hidden />}

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
              alt={recipie.name || "Recipe image"}
              onClick={() => onView(recipie)}
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
            onClick={() => onView(recipie)}
            disabled={opLoading}
            aria-label="view"
          >
            <GrFormView />
          </IconButton>

          <IconButton
            onClick={() => onDelete(recipie.id)}
            disabled={opLoading}
            aria-label="delete"
          >
            <MdDelete />
          </IconButton>
        </div>
      </div>
    </div>
  );
});

/* ================= Main Component ================= */

function ReceipeCards({ recipes: propsRecipes }) {
  const navigate = useNavigate();
  const toast = useRef(null);

  const {
    recipies,
    selectedRecipie,
    setSelectedRecipie,
    deleteRecipe,
    updateRecipe,
  } = useContext(ReceipeContext);

  const [deleteReceipe, setDeleteReceipe] = useState(null);
  const [
    isDeleteRecipieConfirmDialogOpen,
    setIsDeleteRecipieConfirmDialogOpen,
  ] = useState(false);

  // Use context data (always available from mock data) or fallback to props
  const recipes = propsRecipes !== undefined ? propsRecipes : recipies;
  const pageLoading = false; // Never show loading since mock data loads instantly

  useEffect(() => {
    if (selectedRecipie) {
      navigate(`/recipie/${selectedRecipie.name}`);
    }
  }, [selectedRecipie, navigate]);

  const viewReceipeHandler = (recipie) => {
    setSelectedRecipie(recipie);
  };

  const handleFavorite = (recipe) => {
    updateRecipe(recipe);
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: recipe.favorite ? "favorited" : "unfavorited",
      life: 3000,
    });
  };

  const handleDelete = (id) => {
    setDeleteReceipe(recipes?.find((r) => r.id === id));
    setIsDeleteRecipieConfirmDialogOpen(true);
  };

  const memoizedRecipes = useMemo(() => recipes, [recipes]);

  if (pageLoading) {
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
                  <Spinner />
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
        accept={() => {
          deleteRecipe(deleteReceipe.id);
          setIsDeleteRecipieConfirmDialogOpen(false);
        }}
        reject={() => setIsDeleteRecipieConfirmDialogOpen(false)}
      />

      {memoizedRecipes && memoizedRecipes.length > 0 ? (
        <div className="cards">
          {memoizedRecipes.map((recipie) => (
            <RecipeCard
              key={recipie.id}
              recipie={recipie}
              onFavorite={handleFavorite}
              onView={viewReceipeHandler}
              onDelete={handleDelete}
              onUpdate={updateRecipe}
            />
          ))}
        </div>
      ) : (
        <div className="NotFound">
          <h3>Recipes Not Found</h3>
        </div>
      )}
    </div>
  );
}

export default ReceipeCards;
