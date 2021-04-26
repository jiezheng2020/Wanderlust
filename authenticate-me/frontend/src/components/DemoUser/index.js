import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./DemoUser.css";

export default function DemoUser() {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(
      sessionActions.login({ credential: "demo@user.io", password: "password" })
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type="submit">Demo</button>
      </form>
    </>
  );
}
