import { useState, createContext, useEffect, useRef } from "react";

export const ReceipeContext = createContext();

export const ReceipeContextProvider = (props) => {
  const recipesRef = useRef([]);
  const [recipies, setRecipies] = useState([]);
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
    const fetchRecipies = async () => {
      try {
        const response = await fetch("http://localhost:3003/receipes");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const recipies = await response.json();
        recipesRef.current = recipies;
        setRecipies(recipies);
      } catch (err) {
        setError(err);
      }
    };

    fetchRecipies();
  }, []);

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
        recipesRef: recipesRef.current,
        addReceipe,
        setAddReceipe,
        isSidePanelOpen,
        setIsSidePanelOpen,
      }}
    >
      {props.children}
    </ReceipeContext.Provider>
  );
};
