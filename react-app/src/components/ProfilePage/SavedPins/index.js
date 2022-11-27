import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserBoards, fetchUserBoardPins } from "../../../store/board";
import "./SavedPins.css";

const SavedPins = (props) => {
  const [pins, setPins] = useState("");
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const userBoards = props.props;
  const boardPins = useSelector((state) =>
    Object.values(state.boards.boardPins)
  );

  let pinsArr = Object.values(boardPins);

  let pinsArrBoard = [];

  for (const pin of pinsArr) {
    let innerPinArr = Object.values(pin);
    let arr = [];
    for (const innerPin of innerPinArr) {
      arr.push(innerPin);
    }
    pinsArrBoard.push(arr);
  }

  useEffect(() => {
    dispatch(fetchUserBoards(profileId));
    dispatch(fetchUserBoardPins(profileId));
  }, []);

  return (
    <>
      <div className="saved-pins-container">
        <div className="user-board-main-container">
          <div className="user-board-container">
            {pinsArrBoard.map((pin, index) => (
              <div className="main-board-container">
                <div className="board-container">
                  <div className="left-images-board">
                    <img src={pin[0].image}></img>
                  </div>
                  <div className="right-images-board">
                    <img src={pin[1].image} className="top-right-img"></img>
                    {pin[2] ? (
                      <img
                        src={pin[2].image}
                        className="bottom-right-img"
                      ></img>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  {/* {pin.map((singlePin) => (
                <div>
                  <div>
                    <img src={singlePin.image}></img>
                  </div>
                  <div></div>
                </div>
              ))} */}
                </div>
                <div>{userBoards[index].name}</div>
                <div style={{ fontSize: "12px" }}>{pin.length} Pins</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedPins;
