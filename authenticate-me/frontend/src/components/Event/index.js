import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, useParams } from "react-router-dom";
import { getEvents } from "../../store/events";
import "./Event.css";

export default function Event() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const eventArr = useSelector((state) => {
    return state.events.events?.filter((eventId) => eventId.id == id);
  });

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  if (!eventArr) return null;

  const event = eventArr[0];

  return <div className="event-page">{event.name}</div>;
}
