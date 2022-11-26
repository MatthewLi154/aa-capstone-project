import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import "./CreatedPins.css";

const CreatedPins = () => {
  const { profileId } = useParams();

  const [pins, setPins] = useState("");
  const [onCreated, setOnCreated] = useState(true);
  const [onSaved, setOnSaved] = useState(false);

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

  console.log(pins);

  const randomHeight = () => {
    return 9 * Math.ceil(Math.random() * 3);
  };

  return (
    <>
      <div className="all-pins-main-container">
        {pins &&
          pins.map((pin) => (
            <div className="pin-container">
              <NavLink to={`/pins/${pin.id}`}>
                <img
                  src={pin.image}
                  style={{ height: `${randomHeight()}rem` }}
                ></img>
                <div>{pin.title}</div>
              </NavLink>
            </div>
          ))}
      </div>
    </>
  );
};

export default CreatedPins;
