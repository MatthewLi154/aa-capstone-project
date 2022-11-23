import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewPin, fetchAllPins } from "../../store/pin";
import "./PinBuilder.css";

const PinBuilder = () => {
  const dispatch = useDispatch();
  const currentProfileId = useSelector((state) => state.session.user.id);

  const [destinationLink, setDestinationLink] = useState("");
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [altText, setAltText] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);

  const [openAlt, setOpenAlt] = useState(false);

  const openAltText = () => {
    if (openAlt) return;
    setOpenAlt(true);
  };

  useEffect(() => {
    console.log(title);
    console.log(image);
    console.log(destinationLink);
    console.log(altText);
    console.log(about);
  }, [title, image, destinationLink, altText, about]);

  const onSubmit = async (e) => {
    if (errors.length > 0) {
      e.preventDefault();
    }

    const newPin = {
      profile_id: currentProfileId,
      destination_link: destinationLink,
      title: title,
      about: about,
      image: image,
      alt_text: altText,
    };

    await dispatch(addNewPin(newPin));
  };

  return (
    <>
      <div className="main-pin-builder-page">
        <div className="main-pin-builder-container">
          <div className="pin-builder-upper-section-head">
            <div className="triple-dot-buttons">
              <i class="fa-solid fa-ellipsis"></i>
            </div>
            <div className="save-to-board-dropdown-button">
              <div className="save-button-container-header" onClick={onSubmit}>
                <div className="select-container-pin-builder">Select</div>
                <div className="select-container-angle-down">
                  <i className="fa-solid fa-angle-down"></i>
                </div>
                <div>
                  <button>Save</button>
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
              {openAlt ? (
                <div className="pin-about-container-pin-builder">
                  <input
                    placeholder="Explain what people can see in the Pin"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                  ></input>
                </div>
              ) : (
                <div className="add-alt-text-button">
                  <button onClick={openAltText}>Add alt text</button>
                </div>
              )}
              <div className="add-destination-link-container">
                <input
                  placeholder="Add a destination link"
                  value={destinationLink}
                  onChange={(e) => setDestinationLink(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PinBuilder;
