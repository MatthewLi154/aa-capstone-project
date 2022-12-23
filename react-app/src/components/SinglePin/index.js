import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { fetchAllPins, fetchSinglePin, deletePin } from "../../store/pin";
import {
  createNewBoard,
  fetchUserBoardPins,
  fetchUserBoards,
} from "../../store/board";
import "./SinglePin.css";
import { fetchAllProfiles } from "../../store/profile";

const SinglePin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pinId } = useParams();
  const currentPin = useSelector((state) => state.pins.singlePin);
  const currentProfileId = useSelector((state) => state.session.user.id);
  const currentUserProfile = useSelector((state) => state.session.user);
  const allPins = useSelector((state) => state.pins.allPins);
  const profiles = useSelector((state) => state.profiles.allProfiles);
  const userBoards = useSelector((state) =>
    Object.values(state.boards.userBoards)
  );
  const boardPins = useSelector((state) => state.boards.boardPins);

  let currentProfile;
  let profileId;
  if (allPins[pinId]) {
    // console.log(allPins[pinId].profileId);
    profileId = allPins[pinId].profileId;
    for (const profile in profiles) {
      if (profileId == profile) {
        currentProfile = profiles[profileId];
      }
    }
  }

  let isCreator = false;
  if (currentProfile && currentProfile.id === currentProfileId) {
    isCreator = true;
  }

  const [board, setBoard] = useState("Profile");
  const [openOptions, setOpenOptions] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [openComments, setOpenComments] = useState(false);
  const [openCommentOptions, setCommentOptions] = useState(false);

  useEffect(() => {
    dispatch(fetchAllPins());
    dispatch(fetchSinglePin(pinId));
    dispatch(fetchUserBoards(currentProfileId));
    dispatch(fetchUserBoardPins(currentProfileId));
    dispatch(fetchAllProfiles());
  }, []);

  useEffect(async () => {
    const data = await fetchComments();
    setComments(data);
  }, [newComment]);

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

  const onOpenComments = async (e) => {
    if (openComments) return;
    setOpenComments(true);
  };

  const onCloseComments = async (e) => {
    if (openComments) {
      setOpenComments(false);
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();
    const response = window.confirm(
      "Are you sure you want to delete this pin?"
    );

    if (response) {
      await dispatch(deletePin(pinId));
      await dispatch(fetchAllPins());
    }

    history.push(`/`);
  };

  const allPinsBoardExist = (boardName) => {
    for (const board of userBoards) {
      if (board.name === boardName) {
        return board;
      }
    }
    return false;
  };

  const onSave = async (e) => {
    e.preventDefault();

    if (board === "Profile") {
      // Check if already saved in board, if it is, show saved and do nothing
      // If saved to profile, check if all pins board exists
      const allPinsBoard = allPinsBoardExist("All Pins");
      // If all pins board exists, check if pin is already in it through boardPins, returns true or false
      const pinExists = () => {
        if (allPinsBoard) {
          let allPinsBoardPins = boardPins[allPinsBoard.id];
          for (const pin in allPinsBoardPins) {
            if (pinId === pin) {
              return true;
            }
          }
        }
        return false;
      };

      const pinExist = pinExists();

      // if pin exists, set saved
      if (pinExist) {
        return setSaved(true);
      } else if (allPinsBoard && !pinExist) {
        // if board exists but pin does not exist, save pin to board
        await fetch(`/api/boards/All Pins/pins/${pinId}/${currentProfileId}`, {
          method: "POST",
        });
        return setSaved(true);
      } else if (!allPinsBoard) {
        // if board does not exist, create board, then save pin to board
        const data = {
          name: "All Pins",
          description: "All Pins",
          profileId: currentProfileId,
        };
        await dispatch(createNewBoard(data, currentProfileId));
        await fetch(`/api/boards/All Pins/pins/${pinId}/${currentProfileId}`, {
          method: "POST",
        });
        await dispatch(fetchUserBoards(currentProfileId));
        await dispatch(fetchUserBoardPins(currentProfileId));

        return setSaved(true);
      }
    } else {
      // For all other boards
      // Get board id of board from name
      let currentBoardId;
      for (const boardEl of userBoards) {
        if (boardEl.name === board) {
          currentBoardId = boardEl.id;
        }
      }

      // key into boardpins using the board id and iterate to find if pin exists
      const pins = boardPins[currentBoardId];
      let pinExist = false;
      for (const pin in pins) {
        if (pin === pinId) {
          pinExist = true;
        }
      }

      if (pinExist) {
        return setSaved(true);
      } else {
        // Save pin to the board
        await fetch(`/api/boards/${board}/pins/${pinId}/${currentProfileId}`, {
          method: "POST",
        });
        await dispatch(fetchUserBoards(currentProfileId));
        await dispatch(fetchUserBoardPins(currentProfileId));

        return setSaved(true);
      }
    }
  };

  const onEdit = () => {
    const pin = {
      title: currentPin.title,
      about: currentPin.about,
      destinationLink: currentPin.destinationLink,
      image: currentPin.image,
      note: currentPin.note,
      altText: currentPin.altText,
    };

    return history.push({ pathname: `/pins/${pinId}/edit`, state: pin });
  };

  const fetchComments = async () => {
    const fetchComments = fetch(`/api/comments/pin/${pinId}`)
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    const comments = async () => {
      const data = await fetchComments;
      return data;
    };

    const commentsData = await comments();
    // Normalize comments after fetching...
    let commentsArr = [];
    for (const comment in commentsData) {
      commentsArr.push(commentsData[comment]);
    }
    return commentsArr;
  };

  const addComment = async () => {
    const newCommentData = {
      profileId: currentProfileId,
      pinId: pinId,
      body: newComment,
    };
    const addNewComment = fetch(`/api/comments/profile/${currentProfileId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCommentData),
    });
  };

  const getTime = (date) => {
    const dateData = new Date(date);
    const dateNow = Date.now();
    const seconds = Math.floor((dateNow - dateData) / 1000);
    if (seconds < 60) {
      return `${seconds}s`;
    } else if (seconds > 60 && seconds < 3600) {
      return `${Math.floor(seconds / 60)}m`;
    } else if (seconds > 3600 && seconds < 84400) {
      return `${Math.floor(seconds / 3600)}h`;
    } else {
      return `${Math.floor(seconds / 84400)}d`;
    }
  };

  return (
    <>
      {userBoards && currentProfile && (
        <div className="main-single-pin-page">
          <div className="main-single-pin-container">
            <div className="single-pin-left-container">
              <img src={currentPin.image}></img>
            </div>
            <div className="single-pin-right-container">
              <div className="single-pin-right-header">
                {isCreator ? (
                  <div className="single-pin-header-left-icons">
                    <i class="fa-solid fa-ellipsis" onClick={onOpenOptions}></i>
                    {openOptions && (
                      <div>
                        <div className="option-dropdown-container">
                          <button onClick={onEdit}>Edit</button>
                          <button onClick={onDelete}>Delete Pin</button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="single-pin-header-left-icons"></div>
                )}
                <div className="save-to-board-dropdown-button">
                  <div className="save-button-container-header">
                    {!saved ? (
                      <>
                        {" "}
                        <div>
                          <select
                            className="select-container-pin-builder"
                            value={board}
                            onChange={(e) => setBoard(e.target.value)}
                          >
                            <option>Profile</option>
                            {userBoards &&
                              userBoards.map((board) => (
                                <option>{board.name}</option>
                              ))}
                          </select>
                        </div>
                        <div>
                          <button
                            onClick={(e) => {
                              onSave(e);
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="single-pin-saved-button">
                        <div>{board}</div>
                        <div className="single-pin-header-save-button">
                          <button>Saved</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="single-pin-margin-left single-pin-destination-link">
                <a
                  href={currentPin.destinationLink}
                  style={{ color: "black" }}
                  target="_blank"
                >
                  {currentPin.destinationLink}
                </a>
              </div>
              <div className="single-pin-margin-left single-pin-title">
                {currentPin.title}
              </div>
              <div className="single-pin-margin-left">{currentPin.about}</div>
              <div className="single-pin-margin-left single-pin-creator-details profile-pic-container-pin-builder main-creator-container">
                <div className="single-pin-creator-details">
                  {currentProfile && currentProfile.profileImg === null ? (
                    <img src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"></img>
                  ) : (
                    <img src={currentProfile.profileImg}></img>
                  )}
                  <div>{currentProfile.username}</div>
                </div>
              </div>
              <div className="single-pin-margin-left comments-main-container">
                <h4>Comments</h4>
                <div
                  onClick={(e) => {
                    if (openComments) {
                      onCloseComments();
                    } else {
                      onOpenComments();
                    }
                  }}
                >
                  <i class="fa-solid fa-angle-down comments-angle-down"></i>
                </div>
                {/* <button onClick={fetchComments}>console</button> */}
              </div>
              {comments &&
                openComments &&
                comments.map((comment) => (
                  <div className="single-pin-margin-left comment-card">
                    <div>
                      <img
                        className="pin-container-profile-img"
                        src={profiles[comment.profileId].profileImg}
                      ></img>
                    </div>
                    <div className="picture-name-detail">
                      <div className="name-comment-container">
                        <div>{profiles[comment.profileId].firstName}</div>
                        <div style={{ fontWeight: "100", fontSize: "14px" }}>
                          {comment.body}
                        </div>
                      </div>
                      <div className="time-options-container">
                        <div>{getTime(comment.createdAt)}</div>
                        <div>
                          {comment.profileId === currentUserProfile.id && (
                            <div>
                              <i class="fa-solid fa-ellipsis comment-ellipsis"></i>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="single-pin-margin-left">
                {currentProfile && currentProfile.profileImg === null ? (
                  <div className="comments-container-section">
                    <img src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"></img>
                    <input type="text" placeholder="Add a comment" />
                  </div>
                ) : (
                  <div className="comments-container-section">
                    <img src={currentUserProfile.profileImg}></img>
                    <input
                      type="text"
                      placeholder="Add a comment"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                      onClick={async () => {
                        addComment();
                        const data = await fetchComments();
                        setNewComment("");
                        setComments(data);
                        onOpenComments();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePin;
