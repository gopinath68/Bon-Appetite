import React, { useContext } from "react";
import { ReceipeContext } from "../context/ReceipeContext";

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
        </ul>
      </aside>
    </div>
  );
}

export default SideBar;
