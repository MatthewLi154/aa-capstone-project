import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div className="log-out-button-profile-dropdown">
      <button
        style={{ textDecoration: "none", backgroundColor: "white" }}
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
