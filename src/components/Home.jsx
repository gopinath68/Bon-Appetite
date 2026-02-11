import React, { useState, useEffect, useContext, useRef } from "react";
import mockData from "../mocks/recipies.json";
import { ReceipeContext } from "../context/ReceipeContext";
import ReceipeCards from "./ReceipeCards";
import NewReceipe from "./NewReceipe";
import Pagination from "./Pagination";
import Hero from "./Hero";
import FavoritesStrip from "./FavoritesStrip";

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
  // loading / error / more states not currently required

  const start = pageAt * pageSize;
  const end = start + pageSize;
  const paginatedRecipes = recipies.slice(start, end);

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
    if (value.length > 2) {
      const SearchedRecipes = recipesRef.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(value.toLowerCase()) ||
          recipe.category[0].toLowerCase().includes(value.toLowerCase()),
      );
      setRecipies(SearchedRecipes);
    } else if (value.length < 2) {
      setRecipies(recipesRef);
    }
    setPageAt(0);
  }
  // togglebutton not used — keep for future UI hook

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
            placeholder="Search Recipe"
          />
          {/* <TbFilter id="filter" /> */}
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

      <div className="favorites-section">
          <h3>Your Favorites</h3>
          <FavoritesStrip />
      </div>

      <div className="main-content">
        {paginatedRecipes.length > 0 ? (
          <ReceipeCards recipes={paginatedRecipes} />
        ) : (
          <div className="NotFound">
             <h3>No recipes found</h3>
             <p>Try searching for something else or clear your filters.</p>
          </div>
        )}
      </div>

      <Pagination totalItems={recipies.length} />
    </div>
  );
}

export default Home;
