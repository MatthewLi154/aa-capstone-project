import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { fetchAllPins, fetchSinglePin, deletePin } from "../../store/pin";
import "./SinglePin.css";

const SinglePin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pinId } = useParams();
  const currentPin = useSelector((state) => state.pins.singlePin);
  // const currentProfileId = useSelector((state) => state.session.user.id);

  const [openOptions, setOpenOptions] = useState(false);

  useEffect(() => {
    dispatch(fetchAllPins());
    dispatch(fetchSinglePin(pinId));
  }, []);

  const onOpenOptions = async (e) => {
    if (openOptions) return;
    setOpenOptions(true);
  };

  useEffect(() => {
    if (!openOptions) return;

    const closeOptions = () => {
      setOpenOptions(false);
    };

    document.addEventListener("click", closeOptions);

    return () => document.removeEventListener("click", closeOptions);
  }, [openOptions]);

  const onDelete = async (e) => {
    e.preventDefault();
    const response = window.confirm(
      "Are you sure you want to delete this pin?"
    );

    if (response) {
      await dispatch(deletePin(pinId));
      await dispatch(fetchAllPins());
    }

    // history.push(`/profile/${currentProfileId}`);
  };

  return (
    <>
      <div className="main-single-pin-page">
        <div className="main-single-pin-container">
          <div className="single-pin-left-container">
            <img src={currentPin.image}></img>
          </div>
          <div className="single-pin-right-container">
            <div className="single-pin-right-header">
              <div className="single-pin-header-left-icons">
                <i class="fa-solid fa-ellipsis" onClick={onOpenOptions}></i>
                {openOptions && (
                  <div>
                    <div className="option-dropdown-container">
                      <button>
                        <NavLink
                          to={`/pins/${pinId}/edit`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          Edit Pin
                        </NavLink>
                      </button>
                      <button onClick={onDelete}>Delete Pin</button>
                    </div>
                  </div>
                )}
              </div>
              <div className="single-pin-header-save-button">
                <button>Save</button>
              </div>
            </div>
            <div className="single-pin-margin-left single-pin-destination-link">
              <a href={currentPin.destination_link} style={{ color: "black" }}>
                {currentPin.destination_link}
              </a>
            </div>
            <div className="single-pin-margin-left single-pin-title">
              {currentPin.title}
            </div>
            <div className="single-pin-margin-left">{currentPin.about}</div>
            <div className="single-pin-margin-left single-pin-creator-details profile-pic-container-pin-builder main-creator-container">
              <div className="single-pin-creator-details">
                <img src="https://i.pinimg.com/564x/49/40/6b/49406b58f4a68552f26d0c6e4a14c0d2.jpg"></img>
                <div>username</div>
              </div>
              <div className="single-pin-creator-details">
                <button>Follow</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePin;
