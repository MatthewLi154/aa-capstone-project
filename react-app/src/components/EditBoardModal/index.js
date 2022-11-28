import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editBoardById, fetchUserBoards } from "../../store/board";
import "./EditBoardModal.css";

const EditBoard = ({ open, onClose, props }) => {
  if (!open) return null;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const currentProfileId = useSelector((state) => state.session.user.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const { boardId, profileId } = props;

  const validate = () => {
    const errors = [];

    if (name.length === 0) {
      errors.push("Don't forget to name your board!");
    } else if (name.length > 55) {
      errors.push("Name must be less than 55 characters!");
    } else if (name.length < 4) {
      errors.push("Name must be longer than 3 characters");
    }

    if (description.length > 255) {
      errors.push(
        "Description is too long. Please keep it less than 255 characters."
      );
    }

    return errors;
  };

  const onEditBoard = async (e) => {
    let errors = validate();

    if (errors.length > 0) {
      e.preventDefault();
      return setErrors(errors);
    }

    const data = {
      name: name,
      description: description,
      profile_id: currentProfileId,
    };

    await dispatch(editBoardById(data, boardId));
    await dispatch(fetchUserBoards(profileId));

    onClose();
  };

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="edit-modal-container"
      >
        <div className="edit-board-main-container-modal">
          <div className="header-edit-board-modal">
            <h2>Edit your board</h2>
            <span onClick={onClose}>
              <i class="fa-solid fa-x"></i>
            </span>
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
          <div className="create-board-input-field-modal">
            <div>Description</div>
            <div>
              <textarea
                placeholder="What is your board about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="delete-board-container-modal">
              <p>Action</p>
              <p className="delete-board-text">Delete board</p>
              <p className="delete-board-subtext">
                Delete this board and all its Pins forever.
              </p>
              <p className="delete-board-subtext">You can't undo this!</p>
            </div>
            <div className="done-button-edit-modal">
              <button onClick={onEditBoard}>Done</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBoard;
