import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserBoards } from "../../../store/board";
import "./SavedPins.css";

const SavedPins = (props) => {
  const [pins, setPins] = useState("");
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const userBoards = props.props;
  console.log(userBoards);

  useEffect(() => {
    dispatch(fetchUserBoards(profileId));
  }, []);

  useEffect(async () => {
    await fetch(`/api/profile/${profileId}/pins/created`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setPins(Object.values(data));
      });
  }, []);

  return (
    <>
      <div className="user-board-container">
        {userBoards.map((board) => (
          <div className="board-container">{board.name}</div>
        ))}
      </div>
    </>
  );
};

export default SavedPins;
