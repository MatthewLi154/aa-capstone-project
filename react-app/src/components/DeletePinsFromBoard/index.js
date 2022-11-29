import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { fetchUserBoardPins, fetchUserBoards } from "../../store/board";
import "./DeletePinsFromBoard.css";

const DeletePinsFromBoard = () => {
  const dispatch = useDispatch();
  const { profileId, boardId } = useParams();
  const boardPins = useSelector((state) => state.boards.boardPins);

  const userBoardPins = boardPins[boardId];

  const pins = [];
  let initialSelected = {};
  for (const pin in userBoardPins) {
    pins.push(userBoardPins[pin]);
    initialSelected[pin] = false;
  }

  console.log(initialSelected);
  const [selected, setSelected] = useState({});
  const [click, setClick] = useState(0);

  useEffect(() => {
    console.log(selected);
  }, [click]);

  useEffect(() => {
    dispatch(fetchUserBoards(profileId));
    dispatch(fetchUserBoardPins(profileId));
  }, []);

  return (
    <>
      <div className="delete-pins-from-board-main-container">
        <h2>Select pins to delete</h2>
        <div className="delete-pins-from-board-header">
          <div className="organize-pins-container">
            {pins.map((pin) => (
              <>
                {!selected[pin.id] ? (
                  <div className="pin-container organize-pins">
                    <img
                      src={pin.image}
                      className="unselected-pin"
                      onClick={(e) => {
                        e.preventDefault();
                        let copy = { ...selected };
                        if (copy[pin.id]) {
                          copy[pin.id] = !copy[pin.id];
                        } else {
                          copy[pin.id] = true;
                        }
                        setSelected(copy);

                        setClick(click + 1);
                      }}
                    ></img>
                  </div>
                ) : (
                  <div className="pin-container organize-pins">
                    <img
                      src={pin.image}
                      className="selected-pin"
                      onClick={(e) => {
                        e.preventDefault();
                        let copy = { ...selected };
                        if (copy[pin.id]) {
                          copy[pin.id] = !copy[pin.id];
                        } else {
                          copy[pin.id] = true;
                        }
                        setSelected(copy);

                        setClick(click + 1);
                      }}
                    ></img>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        <div className="trash-container-main">
          <div className="trash-container">
            <i class="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletePinsFromBoard;
