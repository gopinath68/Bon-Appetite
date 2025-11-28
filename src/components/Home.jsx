import React, { useState, useEffect, useContext, useRef } from "react";
import { TbFilter } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { ReceipeContext } from "../context/ReceipeContext";
import ReceipeCards from "./ReceipeCards";
import NewReceipe from "./NewReceipe";
import Pagination from "./Pagination";
import SideBar from "./SideBar";

function Home() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const catogeryRef = useRef([]);

  const {
    recipies,
    setRecipies,
    pageAt,
    setPageAt,
    recipesRef,
    pageSize,
    isSidePanelOpen,
    setIsSidePanelOpen,
  } = useContext(ReceipeContext);

  const [catogoriesData, setCatogoriesData] = useState([]);
  const [click, setClick] = useState(true);
  const [slicedCatogerys, setSlicedCatogerys] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggledButton, setToggledbutton] = useState(false);
  const [more, setMore] = useState([]);

  const start = pageAt * pageSize;
  const end = start + pageSize;
  const paginatedRecipes = recipies.slice(start, end);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3003/categories");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        catogeryRef.current = result;
        setCatogoriesData(result);
        setSlicedCatogerys(result.slice(0, 8));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
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
      recipe.category.includes(selectedRecipie)
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
          recipe.category[0].toLowerCase().includes(value.toLowerCase())
      );
      setRecipies(SearchedRecipes);
    } else if (value.length < 2) {
      setRecipies(recipesRef);
    }
    setPageAt(0);
  }
  function togglebutton() {
    setToggledbutton(!toggledButton);
  }

  return (
    <div className={`home ${isSidePanelOpen == true ? "opacity" : ""}`}>
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

<<<<<<< HEAD
      <button onClick={() => navigate("/recent-recipies")}>
        Go to Recents
      </button>
=======
      {/* <button onClick={() => navigate("/recent-recipies")}>
        Go to Recents
      </button> */}
>>>>>>> origin/main
      <div className="sideContainer">
        <SideBar recipes={recipesRef} catogoriesData={catogoriesData} />
        <ReceipeCards recipes={paginatedRecipes} />
      </div>

      <Pagination totalItems={recipies.length} />
    </div>
  );
}

export default Home;
