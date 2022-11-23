import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [profileDropDown, setProfileDropDown] = useState(false);
  const currentProfileId = useSelector((state) => state.session.user.id);

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
      <div className="navbar-main-container">
        <div className="nav-button-container">
          <NavLink to="/" exact={true} style={{ textDecoration: "none" }}>
            <span>N</span>
          </NavLink>
        </div>
        <div className="nav-button-container">
          <NavLink
            to="/"
            exact={true}
            style={{ textDecoration: "none" }}
            activeClassName="active"
          >
            Home
          </NavLink>
        </div>
        <div className="nav-button-container">
          <NavLink
            to="/"
            exact={true}
            style={{ textDecoration: "none" }}
            activeClassName="active"
          >
            Today
          </NavLink>
        </div>
        <div className="nav-button-container">
          <NavLink
            to="/"
            exact={true}
            style={{ textDecoration: "none" }}
            activeClassName="active"
          >
            Create
          </NavLink>
        </div>
        <i class="fa-solid fa-magnifying-glass"></i>
        <div className="nav-button-container search-container">
          <input placeholder="Search"></input>
        </div>
        <div className="nav-button-container">
          <NavLink
            to="/login"
            style={{ textDecoration: "none" }}
            exact={true}
            activeClassName="active"
          >
            Login
          </NavLink>
        </div>
        <div className="nav-button-container">
          <NavLink
            to="/sign-up"
            style={{ textDecoration: "none" }}
            exact={true}
            activeClassName="active"
          >
            Sign Up
          </NavLink>
        </div>
        <div className="nav-button-container">
          <NavLink
            to="/users"
            style={{ textDecoration: "none" }}
            exact={true}
            activeClassName="active"
          >
            Users
          </NavLink>
        </div>
        <div className="nav-button-container">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );

  return (
    <nav>
      <div className="navbar-main-container">
        <div className="nav-button-container">
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
            to="/"
            exact={true}
            style={{ textDecoration: "none", color: "black" }}
            activeClassName="active"
          >
            Today
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
                <li>Create Pin</li>
              </ul>
            </div>
          )}
        </div>
        <div className="nav-button-container search-container">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input placeholder="Search"></input>
        </div>
        <div>
          <div className="navbar-profile-picture">
            <NavLink to={`/profile/${currentProfileId}`}>
              <img src="https://i.pinimg.com/564x/08/13/5c/08135cd812b33ad4788956ac2980898f.jpg"></img>
            </NavLink>
          </div>
          {profileDropDown && (
            <div className="profile-drop-down">
              <div>username</div>
            </div>
          )}
        </div>
        <div className="nav-button-container" onClick={openProfileDropDown}>
          <i class="fa-solid fa-angle-down"></i>
        </div>
        <div className="nav-button-container">
          <LogoutButton />
        </div>
        <div className="nav-button-container">
          <NavLink
            to="/login"
            style={{ textDecoration: "none", color: "black" }}
            exact={true}
            activeClassName="active"
          >
            Login
          </NavLink>
        </div>
        {/* <div className="nav-button-container">
          <NavLink to='/login' style={{ textDecoration: 'none' }} exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div>
        <div className="nav-button-container">
          <NavLink to='/sign-up' style={{ textDecoration: 'none' }} exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>
        <div className="nav-button-container">
          <NavLink to='/users' style={{ textDecoration: 'none' }} exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div>
        <div className="nav-button-container">
          <LogoutButton />
        </div> */}
      </div>
    </nav>
  );
};

export default NavBar;
