import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchAllPins, searchPins } from "../../store/pin";
import { fetchAllProfiles } from "../../store/profile";

const SearchParams = () => {
  const dispatch = useDispatch();
  const { searchParams } = useParams();
  const allPins = useSelector((state) => Object.values(state.pins.allPins));
  const [showMenu, setShowMenu] = useState(false);
  const searchedPins = useSelector((state) =>
    Object.values(state.pins.searchPins)
  );
  console.log(searchedPins);

  useEffect(() => {
    dispatch(fetchAllPins());
    dispatch(fetchAllProfiles());
    dispatch(searchPins(searchParams));
  }, []);

  return (
    <>
      <div className="all-pins-main-container">
        {searchedPins.length > 0 ? (
          searchedPins.map((pin) => (
            <div className="pin-container-board">
              <NavLink
                to={`/pins/${pin.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div>
                  <img src={pin.image}></img>
                </div>
                <div>{pin.title}</div>
              </NavLink>
            </div>
          ))
        ) : (
          <div>Can not find any results for: {searchParams}</div>
        )}
      </div>
    </>
  );
};

export default SearchParams;
