import React from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./DemoUser.css";

export default function DemoUser() {
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    return dispatch(
      sessionActions.login({ credential: "demo@user.io", password: "password" })
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <button className="demo-btn" type="submit">
          Demo
        </button>
      </form>
    </>
  );
}
