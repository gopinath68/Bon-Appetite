import { useState, createContext, useEffect, useRef } from "react";
import mockData from "../mocks/recipies.json";

export const ReceipeContext = createContext();

export const ReceipeContextProvider = (props) => {
  const masterRef = useRef([]);
  const [recipies, setRecipiesState] = useState([]);
  const [selectedRecipie, setSelectedRecipie] = useState(null);
  const [pageAt, setPageAt] = useState(0);
  const [filteredCatogerys, setFilteredCatogerys] = useState([]);
  const [pageSize] = useState(12);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [addReceipe, setAddReceipe] = useState({
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
  });

  useEffect(() => {
    // Use mock data during development / offline mode
    // mockData may be either an array or an object with a `receipes` key
    const initial = Array.isArray(mockData)
      ? mockData
      : mockData.receipes || [];
    masterRef.current = initial;
    // visible list starts as the full master list
    setRecipiesState(initial);
  }, []);
  // visible setter (for filtering etc.)
  const setRecipies = (next) => {
    setRecipiesState(next);
  };

  // master operations: add/update/delete keep the master list and the visible
  // list in sync. These should be used for CRUD operations so the original
  // full list isn't lost when users filter the visible list.
  const addRecipe = (recipe) => {
    masterRef.current = [recipe, ...masterRef.current];
    setRecipiesState((prev) => [recipe, ...prev]);
  };

  const updateRecipe = (recipe) => {
    masterRef.current = masterRef.current.map((r) =>
      r.id === recipe.id ? recipe : r,
    );
    setRecipiesState((prev) =>
      prev.map((r) => (r.id === recipe.id ? recipe : r)),
    );
  };

  const deleteRecipe = (id) => {
    masterRef.current = masterRef.current.filter((r) => r.id !== id);
    setRecipiesState((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <ReceipeContext.Provider
      value={{
        recipies,
        setRecipies,
        selectedRecipie,
        setSelectedRecipie,
        pageAt,
        setPageAt,
        pageSize,
        filteredCatogerys,
        setFilteredCatogerys,
        recipesRef: masterRef.current,
        addReceipe,
        setAddReceipe,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        isSidePanelOpen,
        setIsSidePanelOpen,
      }}
    >
      {props.children}
    </ReceipeContext.Provider>
  );
};
