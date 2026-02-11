import React, { useState, useEffect, useContext } from "react";
import { ReceipeContext } from "../context/ReceipeContext";
import { useNavigate } from "react-router-dom";

function Hero() {
  const { recipesRef, setSelectedRecipie } = useContext(ReceipeContext);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (recipesRef && recipesRef.length > 0) {
      // Pick 5 random recipes to feature
      const shuffled = [...recipesRef].sort(() => 0.5 - Math.random());
      setFeaturedRecipes(shuffled.slice(0, 5));
      setLoading(false);
    }
  }, [recipesRef]);

  useEffect(() => {
    if (featuredRecipes.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredRecipes.length);
      }, 5000); // Change every 5 seconds
      return () => clearInterval(interval);
    }
  }, [featuredRecipes]);

  const handleLearnMore = (recipe) => {
    if (recipe) {
      setSelectedRecipie(recipe);
      navigate(`/recipie/${recipe.name}`);
    }
  };

  const currentRecipe = featuredRecipes[currentIndex];

  if (loading) {
    return (
      <div className="hero skeleton">
        <div className="hero-content">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  if (!currentRecipe) return null;

  return (
    <div className="hero-container">
      {featuredRecipes.map((recipe, index) => (
        <div
          key={recipe.id}
          className={`hero-slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${recipe.image})` }}
        >
          <div className="hero-overlay">
            <div className="hero-content">
              <div className="hero-content-box">
                <h1>{recipe.name}</h1>
                <p className="hero-category">{recipe.category.join(", ")}</p>
                <button 
                  className="view-recipe-btn"
                  onClick={() => setSelectedRecipie(recipe)}
                >
                  View Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="hero-indicators">
        {featuredRecipes.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
