import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import {
  deleteBoardById,
  fetchUserBoardPins,
  fetchUserBoards,
} from "../../store/board";
import EditBoard from "../EditBoardModal";
import "./SingleBoard.css";

const SingleBoard = () => {
  const { profileId, boardId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const pins = useSelector((state) => state.boards.boardPins[boardId]);
  const boards = useSelector((state) => state.boards.userBoards[boardId]);
  const user = useSelector((state) => state.session.user);

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const pinsArr = [];
  for (const pin in pins) {
    pinsArr.push(pins[pin]);
  }

  useEffect(() => {
    dispatch(fetchUserBoards(profileId));
    dispatch(fetchUserBoardPins(profileId));
  }, [dispatch]);

  const randomHeight = () => {
    return 9 * Math.ceil(Math.random() * 3);
  };

  // Modal for edit and delete board
  const [openModal, setOpenModal] = useState(false);

  const onDeleteBoard = async (e) => {
    e.preventDefault();

    console.log(boardId);

    await dispatch(deleteBoardById(boardId));
    await dispatch(fetchUserBoards(profileId));

    return history.push(`/profile/${profileId}`);
  };

  return (
    <>
      <div className="single-board-page-container">
        <div className="boards-details-main-container">
          {boards && (
            <div className="board-details-container">
              <div className="board-details-header">
                <h1>{boards.name}</h1>
                <i
                  className="fa-solid fa-ellipsis ellipsis-container"
                  onClick={openMenu}
                ></i>
                {showMenu && (
                  <div className="single-board-page-dropdown">
                    <ul>
                      <li className="board-options-text">Board Options</li>
                      <li
                        className="board-option-buttons"
                        onClick={(e) => {
                          setOpenModal(true);
                          e.stopPropagation();
                        }}
                      >
                        Edit board
                      </li>

                      <li
                        className="board-option-buttons"
                        onClick={onDeleteBoard}
                      >
                        Delete board
                      </li>
                    </ul>
                  </div>
                )}
                <EditBoard
                  open={openModal}
                  onClose={() => setOpenModal(false)}
                  props={{ boardId, profileId, boards, setShowMenu }}
                />
              </div>
              {user && user.profileImg === null ? (
                <img src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"></img>
              ) : (
                <img src={user.profileImg}></img>
              )}
              <div>{boards.description}</div>
              <div
                className="organize-container-main"
                onClick={(e) => {
                  history.push(
                    `/profile/${profileId}/board/${boardId}/organize`
                  );
                }}
              >
                <div className="organize-container">
                  <i class="fa-solid fa-cube"></i>
                </div>
                <span>Organize</span>
              </div>
            </div>
          )}
        </div>
        <div style={{ marginLeft: "2rem" }}>{pinsArr.length} Pins</div>
        <div className="single-board-main-container-pins">
          {pinsArr.length > 0 &&
            pinsArr.map((pin) => (
              <div className="pin-container-board">
                <NavLink
                  to={`/pins/${pin.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div>
                    <img
                      src={pin.image}
                      //   style={{ height: `${randomHeight()}rem` }}
                    ></img>
                  </div>
                  <div>{pin.title}</div>
                </NavLink>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SingleBoard;
