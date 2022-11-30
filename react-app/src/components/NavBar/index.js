import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, a } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import LoginModal from "../LoginModal";
import SignUpModal from "../SignUpModal";
import "./NavBar.css";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [profileDropDown, setProfileDropDown] = useState(false);
  const currentProfile = useSelector((state) => state.session.user);
  // Modal for login
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

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
            {/* <div className="nav-button-container">
              <NavLink
                to="/"
                exact={true}
                style={{ textDecoration: "none", color: "black" }}
                activeClassName="active"
              >
                Today
              </NavLink>
            </div> */}
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
            {/* <div className="create-angle-and-dropdown">
              <div onClick={openMenu}>
                <i className="fa-solid fa-angle-down"></i>
              </div>
              {showMenu && (
                <div className="create-pin-dropdown">
                  <ul>
                    <li>Create Pin</li>
                  </ul>
                </div>
              )}
            </div> */}
            <div className="nav-button-container search-container">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input placeholder="Search"></input>
            </div>
            <div>
              <div className="navbar-profile-picture">
                <NavLink to={`/profile/${currentProfile.id}`}>
                  <img src="https://i.pinimg.com/564x/08/13/5c/08135cd812b33ad4788956ac2980898f.jpg"></img>
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
                      <img src={currentProfile.profileImg}></img>
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
