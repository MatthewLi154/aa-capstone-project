import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, a, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import LoginModal from "../LoginModal";
import SignUpModal from "../SignUpModal";
import CreateBoard from "../CreateBoardModal";
import { searchPins } from "../../store/pin";
import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);
  const [profileDropDown, setProfileDropDown] = useState(false);
  const currentProfile = useSelector((state) => state.session.user);

  // Modal for login Sign UP
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

  // Modal for Create Board
  const [openModal, setOpenModal] = useState(false);

  // state for search
  const [search, setSearch] = useState("");

  const onSearch = async (e) => {
    e.preventDefault();

    if (search.length === 0) return setSearch("");

    await dispatch(searchPins(search));

    history.push(`/search/${search}`);
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    // if (openModal && showMenu) setShowMenu(false);

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu, openModal]);

  const openProfileDropDown = () => {
    if (profileDropDown) return;
    setProfileDropDown(true);
  };

  useEffect(() => {
    if (!profileDropDown) return;

    const closeProfileDropDown = () => {
      setProfileDropDown(false);
    };

    document.addEventListener("click", closeProfileDropDown);

    return () => document.removeEventListener("click", closeProfileDropDown);
  }, [profileDropDown]);

  const loggedOut = (
    <nav>
      <div className="navbar-main-container logged-out-main-container">
        <div className="nav-button-container logo-button">
          <NavLink to="/" exact={true} style={{ textDecoration: "none" }}>
            <span>N</span>
          </NavLink>
        </div>
        <div className="logged-out-right-side-container">
          <div>
            <a
              href="https://github.com/MatthewLi154/pinature-capstone-project"
              target="_blank"
              style={{
                textDecoration: "none",
                margin: "0rem 1rem",
                color: "black",
                fontWeight: "500",
              }}
            >
              About
            </a>
          </div>
          <div
            onClick={(e) => {
              setOpenLoginModal(true);
              e.stopPropagation();
            }}
            className="login-button-nav-bar"
          >
            Log in
          </div>
          <LoginModal
            open={openLoginModal}
            onClose={() => setOpenLoginModal(false)}
          />
          <div
            className="signup-bottom-nav-bar"
            onClick={(e) => {
              setOpenSignupModal(true);
              e.stopPropagation();
            }}
          >
            Sign Up
          </div>
          <SignUpModal
            open={openSignupModal}
            onClose={() => setOpenSignupModal(false)}
          />
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {!currentProfile ? (
        loggedOut
      ) : (
        <nav>
          <div className="navbar-main-container">
            <div className="nav-button-container logo-button">
              <NavLink
                to="/"
                exact={true}
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>N</span>
              </NavLink>
            </div>
            <div className="nav-button-container">
              <NavLink
                to="/"
                exact={true}
                style={{ textDecoration: "none", color: "black" }}
                activeClassName="active"
              >
                Home
              </NavLink>
            </div>
            <div className="nav-button-container">
              <NavLink
                to="/pin-builder"
                exact={true}
                style={{ textDecoration: "none", color: "black" }}
                activeClassName="active"
              >
                Create
              </NavLink>
            </div>
            <div className="create-angle-and-dropdown">
              <div onClick={openMenu}>
                <i className="fa-solid fa-angle-down"></i>
              </div>
              {showMenu && (
                <div className="create-pin-dropdown">
                  <ul>
                    <li>
                      <NavLink
                        to="/pin-builder"
                        exact={true}
                        style={{ textDecoration: "none", color: "black" }}
                        activeClassName="active"
                      >
                        Create Pin
                      </NavLink>
                    </li>
                    <li
                      onClick={(e) => {
                        setOpenModal(true);
                        e.preventDefault();
                        e.stopPropagation(() => {
                          setShowMenu(false);
                        });
                      }}
                    >
                      Create Board
                    </li>
                    {
                      <CreateBoard
                        open={openModal}
                        onClose={() => {
                          setOpenModal(false);
                          setShowMenu(false);
                        }}
                      />
                    }
                  </ul>
                </div>
              )}
            </div>

            <form
              onSubmit={onSearch}
              className="nav-button-container search-container"
            >
              <i
                className="fa-solid fa-magnifying-glass"
                onClick={onSearch}
              ></i>
              <input
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </form>

            <div>
              <div className="navbar-profile-picture">
                <NavLink to={`/profile/${currentProfile.id}`}>
                  {currentProfile && currentProfile.profileImg ? (
                    <img src={currentProfile.profileImg}></img>
                  ) : (
                    <img src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"></img>
                  )}
                </NavLink>
              </div>
            </div>
            <div className="nav-button-container" onClick={openProfileDropDown}>
              <i class="fa-solid fa-angle-down"></i>
              {profileDropDown && (
                <div className="profile-drop-down">
                  <div className="currently-in-container">Currently in</div>
                  <div className="profile-detail-dropdown-container">
                    <NavLink
                      to={`/profile/${currentProfile.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                      className="profile-detail-dropdown-container"
                    >
                      {currentProfile && currentProfile.profileImg ? (
                        <img src={currentProfile.profileImg}></img>
                      ) : (
                        <img src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"></img>
                      )}
                      {currentProfile.firstName}
                    </NavLink>
                  </div>
                  <div className="logout-button-nav-container">
                    <LogoutButton>Log out</LogoutButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;
