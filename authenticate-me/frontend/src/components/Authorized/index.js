import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./Authorized.css";

export default function Authorized() {
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) return <Redirect to="/"></Redirect>;

  return <div className="authorized-home">Authorized Home Page</div>;
}
