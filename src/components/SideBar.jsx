import React, { useContext } from "react";
import { ReceipeContext } from "../context/ReceipeContext";

<<<<<<< HEAD
function SideBar({ recipes }) {
  const { selectedRecipie, setSelectedRecipie, recipies, setRecipies } =
    useContext(ReceipeContext);
  const viewFavoratiesHandler = (recipie) => {
    setSelectedRecipie(recipie);
  };
  return (
    <div className="sideBarContainer">
      <aside className="sideBar">
        {/* <h5>recents</h5> */}
        {/* <ul>
          <li>spicy panneer</li>
          <li>choco lava cake</li>
          <li></li>
          <li></li>
          <li></li>
        </ul> */}
        <h5 className="favorate">Favoraties</h5>
        <ul id="favorateReceipes">
          {recipies.map(
            (item) =>
              item.favorite === true && (
                <li
                  className="receipeFavorate"
                  key={item.id}
                  onClick={() => viewFavoratiesHandler(item)}
                >
                  {item.name}
                </li>
              )
          )}
=======
function SideBar() {
  const { selectedRecipie, setSelectedRecipie, recipies } =
    useContext(ReceipeContext);

  const viewFavoratiesHandler = (recipie) => {
    setSelectedRecipie(recipie);
  };

  return (
    <div className="sideBarContainer">
      <aside className="sideBar animatedSidebar">
        <h5 className="favorate fadeIn">Favorites</h5>

        <ul id="favorateReceipes">
          {recipies
            .filter((item) => item.favorite === true)
            .map((item, index) => (
              <li
                className={`receipeFavorate listItemFade ${
                  selectedRecipie?.id === item.id ? "activeFav" : ""
                }`}
                key={item.id}
                style={{ animationDelay: `${index * 0.12}s` }}
                onClick={() => viewFavoratiesHandler(item)}
              >
                {item.name}
              </li>
            ))}
>>>>>>> origin/main
        </ul>
      </aside>
    </div>
  );
}

export default SideBar;
