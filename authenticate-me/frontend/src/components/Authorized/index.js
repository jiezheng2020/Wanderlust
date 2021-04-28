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
        <div classname="events-content">
          <h1>Most Popular Events</h1>
          <div className="events-row">
            <div className="event-item">1</div>
            <div className="event-item">2</div>
            <div className="event-item">3</div>
            <div className="event-item">4</div>
          </div>
        </div>
        <div classname="events-content">
          <h1>Events By</h1>
          <div className="events-row">
            <div className="event-item">1</div>
            <div className="event-item">2</div>
            <div className="event-item">3</div>
            <div className="event-item">4</div>
          </div>
        </div>
        <div classname="events-content">
          <h1>Other Events</h1>
          <div className="events-row">
            <div className="event-item">1</div>
            <div className="event-item">2</div>
            <div className="event-item">3</div>
            <div className="event-item">4</div>
          </div>
        </div>
      </div>
    </div>
  );
}
