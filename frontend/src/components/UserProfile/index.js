import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "./UserProfile.css";
import { getEvents, getUserEvents } from "../../store/events";

export default function UserProfile() {
  const dispatch = useDispatch;
  const sessionUser = useSelector((state) => state.session.user);
  const events = useSelector((state) => {
    return state.events.event;
  });

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getUserEvents(sessionUser.id));
  }, [dispatch]);

  if (!sessionUser) return <Redirect to="/"></Redirect>;
  if (!events) return null;
  return (
    <div>
      User Profile
      <div>Stuff</div>
    </div>
  );
}
