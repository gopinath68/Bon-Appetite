import React from "react";
import { useContext } from "react";
import { ReceipeContext } from "../context/ReceipeContext";
import { Navigate, useNavigate } from "react-router-dom";
import { IconButton } from "./ReceipeCards";
import { IoIosArrowDropleftCircle } from "react-icons/io";

function ViewReceipe() {
  const { selectedRecipie, setSelectedRecipie } = useContext(ReceipeContext);

  if (!selectedRecipie) {
    return <Navigate to="/" replace />;
  }

  console.log("selectedRecipie: ", selectedRecipie);
  return (
    <>
      <div className="viewBody">
        <div className="header">
          <IconButton
            className="backButton"
            onClick={() => setSelectedRecipie(null)}
          >
            <IoIosArrowDropleftCircle className="backIcon" />
          </IconButton>
          <span className="recipeTitle">{selectedRecipie.name}</span>
        </div>
        <div className="ImageNutrition">
          <div className="nutrition">
            <h3>Nutrition</h3>
            <ol>
              {Object.entries(selectedRecipie.nutrition).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ol>
          </div>
          <div className="imageContainer">
            <img
              className="recipeImage"
              src={selectedRecipie.image}
              alt={selectedRecipie.name}
            />
          </div>
        </div>

        <div className="timeTaked">
          <h3>Time Taken</h3>
          <ul>
            <li>Prep Time: {selectedRecipie.prepTime} minutes</li>
            <li>Cook Time: {selectedRecipie.cookTime} minutes</li>
            <li>Servings: {selectedRecipie.servings} members</li>
          </ul>
        </div>

        <div className="ingredientsSteps">
          <div className="ingredients">
            <h3>Ingredients</h3>
            {/* <div
              dangerouslySetInnerHTML={{ __html: selectedRecipie.ingredients }}
            ></div> */}
            <ul>
              {selectedRecipie.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="steps">
            <h3>Steps</h3>
            <ul>
              {" "}
              {selectedRecipie.steps.map((step, idx) => (
                <li id="step" key={idx}>
                  {step}
                </li>
              ))}
            </ul>
            {/* <div
              dangerouslySetInnerHTML={{ __html: selectedRecipie.steps }}
            ></div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewReceipe;
