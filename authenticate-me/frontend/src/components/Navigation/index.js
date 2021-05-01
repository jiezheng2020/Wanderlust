import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import DemoUser from "../DemoUser";
import SignupFormModal from "../SignupFormModal";
import CreateGroupModal from "../CreateGroupModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <CreateGroupModal />
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <DemoUser />
        <NavLink to="/login">Log In</NavLink>
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className="navbar">
      <div className="navhome">
        <NavLink className="home-logo" exact to="/">
          Wanderlust
        </NavLink>
      </div>
      <div className="navlinks">{isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;
