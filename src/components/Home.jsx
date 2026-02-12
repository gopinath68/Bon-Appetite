import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import mockData from "../mocks/recipies.json";
import { TbFilter } from "react-icons/tb";
import { ReceipeContext } from "../context/ReceipeContext";
import ReceipeCards from "./ReceipeCards";
import NewReceipe from "./NewReceipe";
import Pagination from "./Pagination";
import Hero from "./Hero";

function Home() {
  // navigate not needed in this component currently
  const [searchData, setSearchData] = useState("");

  const catogeryRef = useRef([]);

  const {
    recipies,
    setRecipies,
    pageAt,
    setPageAt,
    recipesRef,
    pageSize,
  } = useContext(ReceipeContext);

  const [catogoriesData, setCatogoriesData] = useState([]);
  const [click, setClick] = useState(true);
  const [slicedCatogerys, setSlicedCatogerys] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const debounceRef = useRef(null);

  const start = pageAt * pageSize;
  const end = start + pageSize;

  useEffect(() => {
    // Read categories from mock data (offline friendly)
    const result = mockData.categories || [];
    catogeryRef.current = result;
    setCatogoriesData(result);
    setSlicedCatogerys(result.slice(0, 8));
  }, []);

  useEffect(() => {
    // Basic SEO for home
    document.title = "Bon Appetite - Home";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Discover recipes, add your favorites, and manage recipes locally with Bon Appetite.",
    );
  }, []);
  const handleMoreCatogery = () => {
    if (click == true) {
      setClick(false);
      setSlicedCatogerys(catogoriesData);
    } else if (click == false) {
      setClick(true);
      const catogery = catogoriesData.slice(0, 8);
      setSlicedCatogerys(catogery);
    }
  };

  const filterCategorys = (selectedRecipie) => {
    const filteredRecipes = recipesRef.filter((recipe) =>
      recipe.category.includes(selectedRecipie),
    );
    setRecipies(structuredClone(filteredRecipes));
    setPageAt(0);
  };

  function allCatogeriesReceipes() {
    setRecipies(recipesRef);
    setPageAt(0);
  }

  function handleSearch(e) {
    const value = e.target.value;
    setSearchData(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (value.length > 0) {
        const q = value.toLowerCase();
        const SearchedRecipes = recipesRef.filter(
          (recipe) =>
            recipe.name.toLowerCase().includes(q) ||
            recipe.category[0]?.toLowerCase().includes(q) ||
            recipe.tags?.some((t) => t.toLowerCase().includes(q)) ||
            recipe.ingredients?.some((ing) =>
              (typeof ing === "string" ? ing : "").toLowerCase().includes(q)
            ),
        );
        setRecipies(SearchedRecipes);
      } else {
        setRecipies(recipesRef);
      }
      setPageAt(0);
    }, 300);
  }

  // Sort recipes before pagination
  const sortedRecipes = useMemo(() => {
    const list = [...recipies];
    switch (sortBy) {
      case "name":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "prepTime":
        return list.sort((a, b) => (a.prepTime || 0) - (b.prepTime || 0));
      case "calories":
        return list.sort(
          (a, b) =>
            (a.nutrition?.calories || 0) - (b.nutrition?.calories || 0)
        );
      default:
        return list;
    }
  }, [recipies, sortBy]);

  const paginatedRecipes = sortedRecipes.slice(start, end);

  return (
    <div className="home">
      <nav id="navBar">
        <h1 id="appName">Bon Appetite</h1>
        <div className="navBarRight">
          <input
            type="text"
            id="searchBar"
            value={searchData}
            onChange={handleSearch}
            placeholder="Search by name, tag, or ingredient…"
          />
          <select
            id="sortSelect"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort: Name (A-Z)</option>
            <option value="prepTime">Sort: Prep Time</option>
            <option value="calories">Sort: Calories</option>
          </select>
          <NewReceipe catogeries={catogoriesData} />

        </div>
      </nav>

      <Hero />
      
      {catogoriesData.length > 0 && (
        <div className="chips">
          <button
            className={`chip ${
              selectedCategoryId === null ? "activeChip" : ""
            }`}
            onClick={() => {
              setSelectedCategoryId(null);
              allCatogeriesReceipes();
            }}
          >
            All
          </button>
          
          <button
            className={`chip ${
              selectedCategoryId === "FAVORITES" ? "activeChip" : ""
            }`}
            onClick={() => {
              if (selectedCategoryId !== "FAVORITES") {
                setSelectedCategoryId("FAVORITES");
                const favRecipes = recipesRef.filter((r) => r.favorite);
                setRecipies(favRecipes);
                setPageAt(0);
              } else {
                setSelectedCategoryId(null);
                allCatogeriesReceipes();
              }
            }}
          >
            Favorites
          </button>

          {slicedCatogerys?.map((category) => (
            <button
              className={`chip ${
                selectedCategoryId === category.id ? "activeChip" : ""
              }`}
              key={category.id}
              onClick={() => {
                if (selectedCategoryId !== category.id) {
                  setSelectedCategoryId(category.id);
                  filterCategorys(category.name);
                } else {
                  setSelectedCategoryId(null);
                  allCatogeriesReceipes();
                }
              }}
            >
              {category.name}
            </button>
          ))}
          <button className="chip" onClick={handleMoreCatogery}>
            {click == true ? "more Catogeries" : "less Catogeries"}
          </button>
        </div>
      )}
      <div className="sideContainer">
        <ReceipeCards recipes={paginatedRecipes} />
      </div>

      <Pagination totalItems={recipies.length} />
    </div>
  );
}

export default Home;
