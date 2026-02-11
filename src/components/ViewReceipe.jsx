import React, { useEffect, useContext } from "react";
import { ReceipeContext } from "../context/ReceipeContext";
import { useNavigate } from "react-router-dom";
import { IconButton } from "./ReceipeCards";
import { IoIosArrowDropleftCircle } from "react-icons/io";

function ViewReceipe() {
  const { selectedRecipie, setSelectedRecipie, recipesRef } = useContext(ReceipeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRecipie) {
      document.title = `Bon Appetite - ${selectedRecipie.name}`;
      window.scrollTo(0, 0); // Ensure scroll to top on change
    }
  }, [selectedRecipie]);

  if (!selectedRecipie) {
    return <Navigate to="/" replace />;
  }

  // Filter similar recipes (same category, excluding current)
  // Randomize the order to show different ones each time
  const similarRecipes = recipesRef
    .filter(
      (r) =>
        r.category.some((c) => selectedRecipie.category.includes(c)) &&
        r.id !== selectedRecipie.id
    )
    .sort(() => 0.5 - Math.random()) // Simple shuffle
    .slice(0, 4); // Show top 4

  const handleSimilarClick = (recipe) => {
    setSelectedRecipie(recipe);
    navigate(`/recipie/${recipe.name}`);
  };

  return (
    <>
      <div className="viewBody">
        <div
          className="header"
          style={{ backgroundImage: `url(${selectedRecipie.image})` }}
        >
          <div className="header-overlay">
            <div className="header-content">
              <IconButton
                  className="backButton"
                  onClick={() => {
                        setSelectedRecipie(null);
                        navigate("/");
                  }}
              >
                <IoIosArrowDropleftCircle className="backIcon" />
              </IconButton>
              <h1 className="recipeTitle">{selectedRecipie.name}</h1>
            </div>
          </div>
        </div>

        <div className="recipe-details-container">
          <aside className="time-nutrition-sidebar">
            <h3 className="section-title">Details</h3>
            
            <div className="timeTaked">
              <h4>Time & Servings</h4>
               <ul>
                <li><strong>Prep Time:</strong> {selectedRecipie.prepTime} mins</li>
                <li><strong>Cook Time:</strong> {selectedRecipie.cookTime} mins</li>
                <li><strong>Servings:</strong> {selectedRecipie.servings} people</li>
              </ul>
            </div>

            <div className="nutrition" style={{marginTop: '2rem'}}>
              <h4>Nutrition</h4>
              <ol>
                {Object.entries(selectedRecipie.nutrition).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <main className="main-recipe-info">
            <div className="ingredients" style={{marginBottom: '3rem'}}>
              <h3 className="section-title">Ingredients</h3>
              <ul className="ingredient-list">
                {selectedRecipie.ingredients.map((ingredient, idx) => (
                  <li key={idx}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="steps">
              <h3 className="section-title">Instructions</h3>
              <ol className="step-list">
                {selectedRecipie.steps.map((step, idx) => (
                  <li key={idx}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </main>
        </div>

        {similarRecipes.length > 0 && (
          <div className="similar-recipes-section" style={{padding: '2rem 3rem', background: '#fafafa'}}>
            <h3 className="section-title">You Might Also Like</h3>
            <div className="similar-grid">
              {similarRecipes.map((recipe) => (
                <div key={recipe.id} className="similar-card" onClick={() => handleSimilarClick(recipe)}>
                  <div style={{overflow: 'hidden'}}>
                     <img src={recipe.image} alt={recipe.name} />
                  </div>
                  <div className="similar-card-content">
                    <h4>{recipe.name}</h4>
                    <span>{recipe.category?.[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewReceipe;
