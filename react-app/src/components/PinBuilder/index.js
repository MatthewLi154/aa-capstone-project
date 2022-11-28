import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewPin, fetchAllPins } from "../../store/pin";
import { useHistory } from "react-router-dom";
import "./PinBuilder.css";
import { fetchUserBoards } from "../../store/board";

const PinBuilder = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentProfileId = useSelector((state) => state.session.user.id);
  const userBoards = useSelector((state) =>
    Object.values(state.boards.userBoards)
  );

  useEffect(() => {
    dispatch(fetchUserBoards(currentProfileId));
  }, []);

  const [destinationLink, setDestinationLink] = useState("");
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [altText, setAltText] = useState("");
  const [image, setImage] = useState("");
  const [board, setBoard] = useState("Profile");
  const [boardExist, setBoardExist] = useState("");
  const [errors, setErrors] = useState([]);
  const [titleErrors, setTitleErrors] = useState([]);
  const [aboutErrors, setAboutErrors] = useState([]);
  const [altTextErrors, setAltTextErrors] = useState([]);
  const [linkErrors, setLinkErrors] = useState([]);

  const [openAlt, setOpenAlt] = useState(false);

  const openAltText = () => {
    if (openAlt) return;
    setOpenAlt(true);
  };

  // useEffect(() => {
  //   console.log(board);
  //   console.log(linkErrors);
  //   console.log(titleErrors);
  // }, [title, image, destinationLink, altText, about, board, linkErrors]);

  const validate = () => {
    let errors = [];
    let titleErrors = [];
    let aboutErrors = [];
    let altTextErrors = [];
    let linkErrors = [];

    // validate title
    if (title.length === 0) {
      titleErrors.push("Please enter a title");
      errors.push("Please enter a title");
    } else if (title.length > 100) {
      titleErrors.push("Title can not exceed 100 characters");
      errors.push("Title can not exceed 100 characters");
    }

    if (about.length === 0) {
      aboutErrors.push("Please enter a description for this pin");
      errors.push("Please enter a description for this pin");
    } else if (about.length > 255) {
      aboutErrors.push("Description can not exceed 255 characters");
      errors.push("Description can not exceed 255 characters");
    }

    if (altText.length > 255) {
      altTextErrors.push("Alt text can not exceed 255 characters");
      errors.push("Alt text can not exceed 255 characters");
    }

    if (destinationLink.length > 255) {
      linkErrors.push("Link can not exceed 255 characters");
      errors.push("Link can not exceed 255 characters");
    }

    setTitleErrors(titleErrors);
    setAboutErrors(aboutErrors);
    setAltText(altTextErrors);
    setLinkErrors(linkErrors);

    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let errors = validate();

    if (errors.length > 0) {
      e.preventDefault();
      return setErrors(errors);
    }

    const newPin = {
      profileId: currentProfileId,
      destinationLink: destinationLink,
      title: title,
      about: about,
      image: image,
      altText: altText,
    };

    const newPinRes = await dispatch(addNewPin(newPin));
    console.log(newPinRes);
    if (board.length !== 0) {
      if (board !== "Profile") {
        await fetch(`/api/boards/${board}/pins/${newPinRes.id}`, {
          method: "POST",
        });
      }
    }

    await dispatch(fetchAllPins());

    console.log("hello");
    history.push(`/pins/${newPinRes.id}`);
  };

  return (
    <>
      <div className="main-pin-builder-page">
        <div className="main-pin-builder-container">
          <div className="pin-builder-upper-section-head">
            <div className="triple-dot-buttons">
              {/* <i class="fa-solid fa-ellipsis"></i> */}
            </div>
            <div className="save-to-board-dropdown-button">
              <div className="save-button-container-header">
                {/* <div className="select-container-pin-builder">Select</div>
                <div className="select-container-angle-down">
                  <i className="fa-solid fa-angle-down"></i>
                </div> */}
                <div>
                  <select
                    className="select-container-pin-builder"
                    value={board}
                    onChange={(e) => setBoard(e.target.value)}
                  >
                    <option>Profile</option>
                    {userBoards &&
                      userBoards.map((board) => <option>{board.name}</option>)}
                  </select>
                </div>
                <div>
                  <button onClick={onSubmit}>Save</button>
                </div>
              </div>
            </div>
          </div>
          <div className="center-pin-builder-details">
            <div className="left-drag-and-drop-upload">
              <div className="drag-and-drop-upload-container">
                <input
                  placeholder="image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></input>
              </div>
              <div className="save-from-site-button">
                <button>Save from site</button>
              </div>
            </div>
            <div className="right-pin-detail-fields">
              <div className="add-your-title-container">
                <input
                  placeholder="Add your title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>
              {titleErrors.length > 0 &&
                titleErrors.map((error) => (
                  <div style={{ color: "red" }}>{error}</div>
                ))}
              <div className="profile-pic-username-container">
                <div className="profile-pic-container-pin-builder">
                  <img src="https://i.pinimg.com/564x/49/40/6b/49406b58f4a68552f26d0c6e4a14c0d2.jpg"></img>
                </div>
                <div>
                  <span>Username</span>
                </div>
              </div>
              <div className="pin-about-container-pin-builder">
                <input
                  placeholder="Tell everyone what your Pin is about"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></input>
              </div>
              {aboutErrors.length > 0 &&
                aboutErrors.map((error) => (
                  <div style={{ color: "red" }}>{error}</div>
                ))}
              {openAlt ? (
                <>
                  <div className="pin-about-container-pin-builder alt-text-input">
                    <input
                      placeholder="Explain what people can see in the Pin (optional)"
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                    ></input>
                  </div>
                  {altTextErrors.length > 0 &&
                    altTextErrors.map((error) => (
                      <div style={{ color: "red" }}>{error}</div>
                    ))}
                </>
              ) : (
                <div className="add-alt-text-button">
                  <button onClick={openAltText}>Add alt text</button>
                </div>
              )}
              <div className="add-destination-link-container">
                <input
                  placeholder="Add a destination link (optional)"
                  value={destinationLink}
                  onChange={(e) => setDestinationLink(e.target.value)}
                ></input>
              </div>
              {linkErrors.length > 0 &&
                linkErrors.map((error) => (
                  <div style={{ color: "red" }}>{error}</div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PinBuilder;
