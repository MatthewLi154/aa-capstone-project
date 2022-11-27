import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { fetchUserBoardPins, fetchUserBoards } from "../../store/board";
import "./SingleBoard.css";

const SingleBoard = () => {
  const { profileId, boardId } = useParams();
  const dispatch = useDispatch();

  const pins = useSelector((state) => state.boards.boardPins[boardId]);
  const boards = useSelector((state) => state.boards.userBoards[boardId]);
  const user = useSelector((state) => state.session.user);
  const pinsArr = [];
  for (const pin in pins) {
    pinsArr.push(pins[pin]);
  }

  useEffect(() => {
    dispatch(fetchUserBoards(profileId));
    dispatch(fetchUserBoardPins(profileId));
  }, []);

  const randomHeight = () => {
    return 9 * Math.ceil(Math.random() * 3);
  };

  return (
    <>
      <div className="single-board-page-container">
        <div className="boards-details-main-container">
          {boards && (
            <div className="board-details-container">
              <div className="board-details-header">
                <h1>{boards.name}</h1>
                <i className="fa-solid fa-ellipsis ellipsis-container"></i>
              </div>
              {/* <div>
                <img src={user.profile_img} />
              </div> */}
            </div>
          )}
        </div>
        <div style={{ marginLeft: "2rem" }}>{pinsArr.length} Pins</div>
        <div className="all-pins-main-container">
          {pinsArr.length > 0 &&
            pinsArr.map((pin) => (
              <div className="pin-container">
                <NavLink to={`/pins/${pin.id}`}>
                  <div>
                    <img
                      src={pin.image}
                      style={{ height: `${randomHeight()}rem` }}
                    ></img>
                  </div>
                  <div>{pin.title}</div>
                </NavLink>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SingleBoard;
