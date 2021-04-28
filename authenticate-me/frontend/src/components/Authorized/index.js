import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./Authorized.css";

export default function Authorized() {
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) return <Redirect to="/"></Redirect>;

  return (
    <div className="authorized-home">
      <div className="events-containers">
        <div className="events-content row1">
          <div className="event-text-row">
            <h1>Most Popular Events</h1>
            <Link to="/">See All</Link>
          </div>
          <div className="events-row ">
            <div className="event-item"></div>
            <div className="event-item"></div>
            <div className="event-item"></div>
            <div className="event-item"></div>
          </div>
        </div>
        <div className="events-content row2">
          <div className="event-text-row">
            <h1>Events By</h1>
            <Link to="/">See All</Link>
          </div>
          <div className="events-row">
            <div className="event-item"></div>
            <div className="event-item"></div>
            <div className="event-item"></div>
            <div className="event-item"></div>
          </div>
        </div>
        <div className="events-content row3">
          <div className="event-text-row">
            <h1>Other Events</h1>
            <Link to="/">See All</Link>
          </div>
          <div className="events-row">
            <div className="event-item"></div>
            <div className="event-item"></div>
            <div className="event-item"></div>
            <div className="event-item"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
