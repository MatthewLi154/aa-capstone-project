import React, { useState, useEffect } from "react";

const CreateBoard = ({ open, onClose }) => {
  if (!open) return null;

  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    console.log(name);
  }, [name]);

  const validate = () => {
    const errors = [];

    if (name.length === 0) {
      errors.push("Don't forget to name your board!");
    } else if (name.length > 55) {
      errors.push("Name must be less than 55 characters!");
    } else if (name.length < 4) {
      errors.push("Name must be longer than 3 characters");
    }

    return errors;
  };

  const onCreateBoard = (e) => {
    let errors = validate();

    if (errors.length > 0) {
      e.preventDefault();
      return setErrors(errors);
    }
  };

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="create-board-modal-header">
          <span>Create Board</span>
        </div>
        <div className="create-board-input-field-modal">
          <div>Name</div>
          <div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Like "Places to go" or "Nature to see"'
            ></input>
          </div>

          {errors.map((error) => (
            <div className="create-board-error-validations">{error}</div>
          ))}
        </div>
        <div className="create-board-create-button-modal">
          {name.length > 0 ? (
            <button
              style={{ backgroundColor: "red", color: "white" }}
              onClick={onCreateBoard}
            >
              Create
            </button>
          ) : (
            <button onClick={onCreateBoard}>Create</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBoard;
