import { useState, createContext, useEffect, useRef } from "react";
import mockData from "../mocks/recipies.json";

export const ReceipeContext = createContext();

const STORAGE_KEY = "bon_appetite_recipes";

// --- localStorage helpers ---
const loadRecipes = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* corrupted data → fall through to seed */ }
  return null;
};

const saveRecipes = (recipes) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  } catch { /* storage full – silent fail */ }
};

export const ReceipeContextProvider = (props) => {
  // Seed from localStorage or fall back to mock data
  const seed = () => {
    const stored = loadRecipes();
    if (stored && stored.length > 0) return stored;
    const initial = Array.isArray(mockData)
      ? mockData
      : mockData.receipes || [];
    return initial;
  };

  const masterRef = useRef(seed());
  const [recipies, setRecipiesState] = useState(masterRef.current);
  const [selectedRecipie, setSelectedRecipie] = useState(null);
  const [pageAt, setPageAt] = useState(0);
  const [filteredCatogerys, setFilteredCatogerys] = useState([]);
  const [pageSize] = useState(12);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [loading, setLoading] = useState(true);
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
    // Brief loading state for skeleton UI, then mark ready
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  // visible setter (for filtering etc.)
  const setRecipies = (next) => {
    setRecipiesState(next);
  };

  // master operations: add/update/delete keep the master list and the visible
  // list in sync and persist to localStorage.
  const addRecipe = (recipe) => {
    masterRef.current = [recipe, ...masterRef.current];
    setRecipiesState((prev) => [recipe, ...prev]);
    saveRecipes(masterRef.current);
  };

  const updateRecipe = (recipe) => {
    masterRef.current = masterRef.current.map((r) =>
      r.id === recipe.id ? recipe : r,
    );
    setRecipiesState((prev) =>
      prev.map((r) => (r.id === recipe.id ? recipe : r)),
    );
    saveRecipes(masterRef.current);
  };

  const deleteRecipe = (id) => {
    masterRef.current = masterRef.current.filter((r) => r.id !== id);
    setRecipiesState((prev) => prev.filter((r) => r.id !== id));
    saveRecipes(masterRef.current);
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
        loading,
      }}
    >
      {props.children}
    </ReceipeContext.Provider>
  );
};
