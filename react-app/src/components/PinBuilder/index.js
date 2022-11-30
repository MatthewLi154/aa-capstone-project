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
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [board, setBoard] = useState("Profile");
  const [boardExist, setBoardExist] = useState("");
  const [errors, setErrors] = useState([]);
  const [titleErrors, setTitleErrors] = useState([]);
  const [aboutErrors, setAboutErrors] = useState([]);
  const [altTextErrors, setAltTextErrors] = useState([]);
  const [linkErrors, setLinkErrors] = useState([]);
  const [imageErrors, setImageErrors] = useState("");

  const [openAlt, setOpenAlt] = useState(false);

  const openAltText = () => {
    if (openAlt) return;
    setOpenAlt(true);
  };

  const validate = () => {
    let errors = [];
    let titleErrors = [];
    let aboutErrors = [];
    let altTextErrors = [];
    let linkErrors = [];
    let imageErrors = [];

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

    if (image.length === 0) {
      imageErrors.push("Please upload a valid image");
      errors.push("Please upload a valid image");
    }

    setTitleErrors(titleErrors);
    setAboutErrors(aboutErrors);
    setAltText(altTextErrors);
    setLinkErrors(linkErrors);
    setImageErrors(imageErrors);

    return errors;
  };

  const updateImage = async (e) => {
    const file = e.target.files[0];
    // if (e.target.files[0].length === 0) {
    //   return setImageErrors("Please upload a valid image");
    // }
    setImage(file);
    const src = URL.createObjectURL(e.target.files[0]);
    const preview = document.getElementById("uploaded-image-preview");
    preview.src = src;
    preview.style.display = "block";
    console.log(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let errors = validate();

    if (errors.length > 0) {
      e.preventDefault();
      return setErrors(errors);
    }

    const formData = new FormData();
    formData.append("image", image);

    setImageLoading(true);

    const res = await fetch("/api/pins/images", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setImageLoading(false);

      const newPin = {
        profileId: currentProfileId,
        destinationLink: destinationLink,
        title: title,
        about: about,
        image: data.url,
        altText: altText,
      };

      const newPinRes = await dispatch(addNewPin(newPin));

      if (board.length !== 0) {
        if (board !== "Profile") {
          await fetch(`/api/boards/${board}/pins/${newPinRes.id}`, {
            method: "POST",
          });
        }
      }

      await dispatch(fetchAllPins());

      history.push(`/pins/${newPinRes.id}`);
    } else {
      setImageLoading(false);
      console.log("error");
      setImageErrors("Invalid image file");
    }
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
              <label>
                <div className="drag-and-drop-upload-container">
                  {!image && (
                    <>
                      <div>
                        <i class="fa-solid fa-cloud-arrow-up"></i>
                      </div>
                      <div>Click to Upload</div>
                    </>
                  )}
                  <img id="uploaded-image-preview"></img>
                  <input
                    type="file"
                    accept="image/*"
                    placeholder="image url"
                    onChange={(e) => {
                      updateImage(e);
                    }}
                  ></input>
                </div>
              </label>
              {imageErrors && <div style={{ color: "red" }}>{imageErrors}</div>}
              {imageLoading && <p>Loading...</p>}
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
