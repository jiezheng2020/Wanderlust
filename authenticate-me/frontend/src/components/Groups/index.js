import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, Link } from "react-router-dom";
import "./Groups.css";
import { getOneGroup } from "../../store/groups";

export default function Groups() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const group = useSelector((state) => {
    return state.group;
  });
  const groupMembers = useSelector((state) => {
    return state.group.Members;
  });

  const groupEvents = useSelector((state) => {
    return state.group.Calendars;
  });

  const groupImg =
    "data:image/jpeg;base64,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";

  useEffect(() => {
    dispatch(getOneGroup(id));
  }, [dispatch, id]);

  if (!sessionUser) return <Redirect to="/"></Redirect>;
  if (!group || !groupMembers || !groupEvents) return null;

  return (
    <div className="group-page">
      <div className="group-content">
        <img alt="" className="group-image" src={groupImg} />
        <div className="group-content-text">
          <div className="group-content-group">
            <h1>{group.name}</h1>
            <p>{groupMembers.length} members | Public Group</p>
            <p>Organized by {group.User.username}</p>
            <p>Located at {group.location}</p>
            {sessionUser && (
              <button className="join-group-btn"> Join Group</button>
            )}
          </div>
        </div>
      </div>
      <div className="group-about">
        <h2>What we're about</h2>
        <div className="group-about-text">{group.description}</div>
      </div>
      <div className="upcoming-events-container">
        <h2>Upcoming Events({groupEvents.length})</h2>
        <div className="upcoming-events">
          <div className="test">
            {/* {group.Calendars.map((event) => {
              return <div className="event-row"> event </div>;
            })} */}
            <div className="event-row">
              <img src={groupImg} />
              <div className="event-row-text">
                <h4>May 4, 2021</h4>
                <h3>Promise Young Woman</h3>
                <h4>Port Gabriella</h4>
                <h4>
                  "Sequi labore cum dolores minima quasi dolorum nesciunt
                  maxime. Aliquam aliquam aut labore a dolores repellendus aut
                  corporis sint. Culpa ullam et recusandae. Ut et neque sunt.
                  Eaque qui beatae sint voluptatibus neque. Soluta fuga et vel
                  autem aperiam dolorem ea occaecati. Accusantium et saepe
                  voluptates nesciunt maxime et consequuntur fugiat. Repudiandae
                  id deleniti inventore. Quasi voluptates sit et rem illum. Et
                  porro rem. Culpa nemo atque iusto eligendi exercitationem
                  voluptatem. Qui illo corporis repellendus quidem dolor
                  accusamus eum. Quibusdam et ullam. Quis ut voluptas quasi odit
                  ullam impedit tenetur."
                </h4>
              </div>
            </div>
            <div className="event-row">EVENT ROW</div>
            <div className="event-row">EVENT ROW</div>
            <div className="event-row">EVENT ROW</div>
            <div className="event-row">EVENT ROW</div>
            <div className="event-row">EVENT ROW</div>
            <div className="event-row">EVENT ROW</div>
            <div className="event-row">EVENT ROW</div>
            <div className="event-row">EVENT ROW</div>
          </div>
        </div>
      </div>
    </div>
  );
}
