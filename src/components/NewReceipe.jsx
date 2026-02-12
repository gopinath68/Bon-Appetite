import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ReceipeContext } from "../context/ReceipeContext";
import { Editor } from "primereact/editor";
import { Sidebar } from "primereact/sidebar";
import { ConfirmPopup } from "primereact/confirmpopup";
import { IconButton } from "./ReceipeCards";
import { IoCloseSharp } from "react-icons/io5";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ConfirmDialog } from "primereact/confirmdialog";
import { isEquals } from "../utils/comparison";
import { useEffect } from "react";

// --- Validation helpers ---
const isValidUrl = (str) => {
  try { new URL(str); return true; } catch { return false; }
};

const validateRecipe = (recipe) => {
  const errs = {};
  if (!recipe.name?.trim()) errs.name = "Recipe name is required";
  if (!recipe.image?.trim()) errs.image = "Image URL is required";
  else if (!isValidUrl(recipe.image)) errs.image = "Please enter a valid URL";
  if (!recipe.category?.[0]) errs.category = "Please select a category";
  if (!recipe.prepTime || isNaN(recipe.prepTime) || Number(recipe.prepTime) <= 0)
    errs.prepTime = "Enter a positive number";
  if (!recipe.cookTime || isNaN(recipe.cookTime) || Number(recipe.cookTime) <= 0)
    errs.cookTime = "Enter a positive number";
  if (!recipe.servings || isNaN(recipe.servings) || Number(recipe.servings) <= 0)
    errs.servings = "Enter a positive number";
  return errs;
};

function NewReceipe({ catogeries }) {
  const navigate = useNavigate();
  // ingredient/steps editor text state removed (unused)
  const toast = useRef(null);
  const blankRecipe = {
    name: "",
    category: [""],
    image: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    tags: [""],
    ingredients: [],
    steps: [],
    favorite: false,
    nutrition: {
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    },
  };

  const [
    isCancalChangesConfirmDialogOpen,
    setIsCancalChangesConfirmDialogOpen,
  ] = useState(false);
  const [errors, setErrors] = useState({});

  const {
    addReceipe,
    setAddReceipe,
    isSidePanelOpen,
    setIsSidePanelOpen,
    addRecipe,
    updateRecipe,
  } = useContext(ReceipeContext);

  const toggleSidebar = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
    setAddReceipe(blankRecipe);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setAddReceipe({
        ...addReceipe,
        tags: value.split(",").map((t) => t.trim()),
      });
    } else {
      setAddReceipe({ ...addReceipe, [name]: value });
    }
  };

  const handleNutrition = (e) => {
    const { name, value } = e.target;
    setAddReceipe({
      ...addReceipe,
      nutrition: { ...addReceipe.nutrition, [name]: value },
    });
  };

  const handleImagePreview = (e) => {
    const url = e.target.value;
    setAddReceipe({ ...addReceipe, image: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateRecipe(addReceipe);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const formatted = {
      ...addReceipe,
      prepTime: Number(addReceipe.prepTime),
      cookTime: Number(addReceipe.cookTime),
      servings: Number(addReceipe.servings),
      nutrition: {
        ...addReceipe.nutrition,
        calories: Number(addReceipe.nutrition.calories),
      },
      id: addReceipe?.id || Date.now().toString(),
    };
    // If addReceipe has an id and exists in list -> update, otherwise add new
    if (addReceipe?.id) {
      // update existing
      const updatedReceipe = { ...addReceipe, ...formatted };
      updateRecipe(updatedReceipe);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Receipe updated successfully",
      });
      setIsSidePanelOpen(false);
      navigate("/");
      return;
    }

    // add new
    try {
      addRecipe(formatted);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Receipe added successfully",
      });
      setIsSidePanelOpen(false);
      setAddReceipe(blankRecipe);
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to save receipe",
      });
    }
  };

  useEffect(() => {
    // Basic SEO: update page title and description
    document.title = addReceipe?.id
      ? "Bon Appetite - Edit Recipe"
      : "Bon Appetite - Add Recipe";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      addReceipe?.id
        ? `Edit recipe ${addReceipe.name || ""} on Bon Appetite`
        : "Add a new recipe on Bon Appetite",
    );
  }, [addReceipe]);

  const accept = () => {
    console.log("keep edit");
  };

  const reject = () => {
    toggleSidebar();
    setAddReceipe(blankRecipe);
  };

  const handleCancelBtn = (addReceipe) => {
    console.log("isEquals", isEquals(addReceipe, blankRecipe));

    if (isEquals(addReceipe, blankRecipe) === false) {
      setIsCancalChangesConfirmDialogOpen(true);
    } else {
      console.log("addReceipe", isEquals(addReceipe, blankRecipe));
      toggleSidebar();
      setAddReceipe(blankRecipe);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog
        {...{
          message: (
            <span>
              Are you sure you want to cancel you will lose the changes
            </span>
          ),
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          defaultFocus: "accept",
          acceptLabel: <span>keep changes</span>,
          rejectLabel: <span> cancel </span>,
          accept,
          reject,
          visible: isCancalChangesConfirmDialogOpen,
        }}
      />
      <div className="addIcon">
        <IconButton onClick={() => toggleSidebar()}>
          <IoIosAddCircleOutline size={30} />
        </IconButton>
      </div>

      <Sidebar
        blockScroll
        dismissable={false}
        visible={isSidePanelOpen}
        position="right"
        onHide={() => setIsSidePanelOpen(false)}
        className="sidePanel"
        content={() => (
          <div className="sidePanelContainer">
            <div className="sidePanelHeader">
              <h5>{addReceipe.id ? "Update Receipe" : "Add New Receipe"}</h5>
              <IconButton onClick={() => setIsSidePanelOpen(false)}>
                <IoCloseSharp />
              </IconButton>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <label>Recipe Name</label>
              <input
                name="name"
                value={addReceipe.name}
                onChange={handleChange}
                className={errors.name ? "form-error-input" : ""}
              />
              {errors.name && <span className="form-error">{errors.name}</span>}

              <label>Image URL</label>
              <input
                name="image"
                value={addReceipe.image}
                onChange={handleImagePreview}
                className={errors.image ? "form-error-input" : ""}
              />
              {errors.image && <span className="form-error">{errors.image}</span>}

              <label>Category</label>
              <select
                value={addReceipe.category?.[0] || ""}
                onChange={(e) =>
                  setAddReceipe({ ...addReceipe, category: [e.target.value] })
                }
                className={errors.category ? "form-error-input" : ""}
              >
                <option value="">Select a category</option>
                {catogeries?.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && <span className="form-error">{errors.category}</span>}

              <label>Preparation Time (mins)</label>
              <input
                name="prepTime"
                type="number"
                min="1"
                value={addReceipe.prepTime}
                onChange={handleChange}
                className={errors.prepTime ? "form-error-input" : ""}
              />
              {errors.prepTime && <span className="form-error">{errors.prepTime}</span>}

              <label>Cooking Time (mins)</label>
              <input
                name="cookTime"
                type="number"
                min="1"
                value={addReceipe.cookTime}
                onChange={handleChange}
                className={errors.cookTime ? "form-error-input" : ""}
              />
              {errors.cookTime && <span className="form-error">{errors.cookTime}</span>}

              <label>Servings</label>
              <input
                name="servings"
                type="number"
                min="1"
                value={addReceipe.servings}
                onChange={handleChange}
                className={errors.servings ? "form-error-input" : ""}
              />
              {errors.servings && <span className="form-error">{errors.servings}</span>}

              <label>Tags (comma separated)</label>
              <input
                name="tags"
                value={addReceipe.tags}
                onChange={handleChange}
              />

              <label>Ingredients</label>

              <label className="Ingredients">
                <Editor
                  value={addReceipe.ingredients}
                  onTextChange={(e) =>
                    setAddReceipe({ ...addReceipe, ingredients: [e.htmlValue] })
                  }
                  style={{ height: "220px" }}
                />
              </label>

              <label className="steps">Steps</label>
              <Editor
                value={addReceipe.steps}
                onTextChange={(e) =>
                  setAddReceipe({ ...addReceipe, steps: [e.htmlValue] })
                }
                style={{ height: "220px" }}
              />

              <label>Nutrition</label>
              <input
                name="calories"
                value={addReceipe.nutrition.calories}
                onChange={handleNutrition}
                placeholder="Calories"
              />
              <input
                name="protein"
                value={addReceipe.nutrition.protein}
                onChange={handleNutrition}
                placeholder="Protein"
              />
              <input
                name="carbs"
                value={addReceipe.nutrition.carbs}
                onChange={handleNutrition}
                placeholder="Carbs"
              />
              <input
                name="fat"
                value={addReceipe.nutrition.fat}
                onChange={handleNutrition}
                placeholder="Fat"
              />

              <div className="buttonGroup">
                <button
                  type="button"
                  onClick={() => handleCancelBtn(addReceipe)}
                >
                  Cancel
                </button>
                <button type="submit">
                  {addReceipe.id ? "Update Receipe" : "Add Receipe"}
                </button>
              </div>
            </form>
          </div>
        )}
      ></Sidebar>
    </>
  );
}

export default NewReceipe;
