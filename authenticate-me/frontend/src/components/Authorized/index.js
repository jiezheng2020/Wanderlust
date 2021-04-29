import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getEvents } from "../../store/events";
import "./Authorized.css";

export default function Authorized() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const events = useSelector((state) => {
    return state.events.events?.map((eventId) => eventId);
  });

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  if (!events) return null;

  const imgAdd =
    "https://static01.nyt.com/images/2020/11/15/business/15biz-JAPAN-ECON/15biz-JAPAN-ECON-videoSixteenByNineJumbo1600.jpg";

  if (!sessionUser) return <Redirect to="/"></Redirect>;

  return (
    <div className="authorized-home">
      <div className="events-containers">
        <div className="events-content row1">
          <div className="event-text-row">
            <h1>Most Popular Events</h1>
            <Link to="/">See All</Link>
          </div>
          <div className="events-row ">
            <div className="event-item">
              <div className="event-item-image">
                <Link to={`/event/${events[0].id}`}>
                  <img className="event-item-image" src={events[0].image} />
                </Link>
              </div>
              <div className="event-item-text">
                <h3>{events[0].detailsTime}</h3>
                <h4>{events[0].name}</h4>
                <h5>{events[0].Group.name}</h5>
                <h5>
                  {events[0].Attendees.length} people are attending this event
                </h5>
              </div>
            </div>
            <div className="event-item">
              <div className="event-item-image">
                <Link to={`/event/${events[1].id}`}>
                  <img className="event-item-image" src={events[1].image} />
                </Link>
              </div>
              <div className="event-item-text">
                <h3>{events[1].detailsTime}</h3>
                <h4>{events[1].name}</h4>
                <h5>{events[1].Group.name}</h5>
                <h5>
                  {events[1].Attendees.length} people are attending this event
                </h5>
              </div>
            </div>
            <div className="event-item">
              <div className="event-item-image">
                <Link to={`/event/${events[2].id}`}>
                  <img className="event-item-image" src={events[2].image} />
                </Link>
              </div>
              <div className="event-item-text">
                <h3>{events[2].detailsTime}</h3>
                <h4>{events[2].name}</h4>
                <h5>{events[2].Group.name}</h5>
                <h5>
                  {events[2].Attendees.length} people are attending this event
                </h5>
              </div>
            </div>
            <div className="event-item">
              <div className="event-item-image">
                <Link to={`/event/${events[3].id}`}>
                  <img className="event-item-image" src={events[3].image} />
                </Link>
              </div>
              <div className="event-item-text">
                <h3>{events[3].detailsTime}</h3>
                <h4>{events[3].name}</h4>
                <h5>{events[3].Group.name}</h5>
                <h5>
                  {events[3].Attendees.length} people are attending this event
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="events-content row2">
          <div className="event-text-row">
            <h1>Events By</h1>
            <Link to="/">See All</Link>
          </div>
          <div className="events-row">
            <div className="event-item"></div>
            <div className="event-item"></div>
            <div className="event-item"></div>
            <div className="event-item"></div>
          </div>
        </div>
        <div className="events-content row3">
          <div className="event-text-row">
            <h1>Other Events</h1>
            <Link to="/">See All</Link>
          </div>
          <div className="events-row">
            <div className="event-item"></div>
            <div className="event-item"></div>
            <div className="event-item"></div>
            <div className="event-item"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
