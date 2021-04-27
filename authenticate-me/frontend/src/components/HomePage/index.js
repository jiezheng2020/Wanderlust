import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return <Redirect to="/authorized"></Redirect>;

  return <div>This is HomePage</div>;
}
