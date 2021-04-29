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
      <div className="event-header">Event Name, Time, Hosted by</div>
      <div className="event-content">Event Image, Event Group, Event Time</div>
      <div className="event-details">Event Details</div>
      <div className="event-attendees">Event Attendees</div>
      <div className="event-comments">Event Comments</div>
    </div>
  );
}
