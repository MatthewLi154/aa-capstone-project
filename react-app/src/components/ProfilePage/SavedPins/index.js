import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserBoards } from "../../../store/board";

const SavedPins = () => {
  const [pins, setPins] = useState("");
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const userBoards = useSelector((state) => state.boards);

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

  return <></>;
};

export default SavedPins;
