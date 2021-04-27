import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return <Redirect to="/authorized"></Redirect>;

  return (
    <div className="homepage">
      <div className="hero-banner">
        <div className="hero-text">
          <h1>Welcome to Wanderlust,</h1>
          <h1>Sign up today to access</h1>
          <h1>our features!</h1>

          <div className="h3-div">
            <h3>Join a group to meet new people,</h3>
            <h3>find a community, and travel together!</h3>
          </div>
        </div>
        <div className="image-container">
          <div className="hero-image" />
        </div>
      </div>
      <div className="home-links">
        <div className="link-containers">
          <div className="event-container">
            <div className="event-links"></div>
            <Link to="/">Make new friends</Link>
          </div>
          <div className="event-container">
            <div className="event-links"></div>
            <Link to="/">Explore the outdoors</Link>
          </div>
          <div className="event-container">
            <div className="event-links"></div>
            <Link to="/">Explore the nightlife</Link>
          </div>
        </div>
      </div>
      <div className="home-intro">This is Home Wanderlust works</div>
    </div>
  );
}
