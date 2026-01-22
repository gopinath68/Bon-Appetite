import React, { useContext } from "react";
import { ReceipeContext } from "../context/ReceipeContext";

function SideBar() {
  const { setSelectedRecipie, recipies } =
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
        </ul>
      </aside>
    </div>
  );
}

export default SideBar;

