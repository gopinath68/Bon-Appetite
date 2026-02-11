import React, { useContext } from "react";
import { ReceipeContext } from "../context/ReceipeContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StripContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f8f8;
  border-bottom: 1px solid #eee;
  white-space: nowrap;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }
`;

const FavChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    border-color: #ff6f00;
  }

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    font-size: 0.9rem;
    font-weight: 500;
    color: #333;
  }
`;

const EmptyState = styled.div`
  padding: 0.5rem;
  color: #888;
  font-style: italic;
  font-size: 0.9rem;
`;

function FavoritesStrip() {
  const { recipies, setSelectedRecipie } = useContext(ReceipeContext);
  const navigate = useNavigate();

  const favorites = recipies.filter((r) => r.favorite);

  const handleClick = (recipe) => {
    setSelectedRecipie(recipe);
    navigate(`/recipie/${recipe.name}`);
  };

  if (favorites.length === 0) {
    return (
        <StripContainer>
            <EmptyState>No favorite recipes yet. Heart some recipes to see them here!</EmptyState>
        </StripContainer>
    )
  }

  return (
    <StripContainer>
      {favorites.map((recipe) => (
        <FavChip key={recipe.id} onClick={() => handleClick(recipe)}>
          {recipe.image ? <img src={recipe.image} alt={recipe.name} /> : null}
          <span>{recipe.name}</span>
        </FavChip>
      ))}
    </StripContainer>
  );
}

export default FavoritesStrip;
