import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, useParams } from "react-router-dom";
import "./Event.css";
import { getOneEvent } from "../../store/events";

export default function Event() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const event = useSelector((state) => {
    return state.events.event;
  });

  useEffect(() => {
    dispatch(getOneEvent(id));
  }, [dispatch]);

  if (!event) return null;
  console.log(event);

  return (
    <div className="event-page">
      <div className="event-header">
        <h4>Thursday, April 29, 2021</h4>
        <h2>The Player(1992)</h2>
        <h4>Hosted By Mindy</h4>
      </div>
      <div className="event-content">
        <img className="event-image" src={event.image} />
        <div className="event-content-text">
          <label className="event-content-group">Event Group</label>
          <label className="event-content-time">Event Time</label>
        </div>
      </div>
      <div className="event-details">Event Details</div>
      <div className="event-attendees">Event Attendees</div>
      <div className="event-comments">Event Comments</div>
    </div>
  );
}
