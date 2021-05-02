import React, { useEffect } from "react";
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

  const groupEvents = useSelector((state) => {
    return state.events.events?.filter(
      (eventId) =>
        parseInt(eventId.Group.id, 10) === parseInt(events[0].groupId, 10)
    );
  });

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  if (!events) return null;
  if (!groupEvents) return null;

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
                  <img
                    alt=""
                    className="event-item-image"
                    src={events[0].image}
                  />
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
                  <img
                    alt=""
                    className="event-item-image"
                    src={events[1].image}
                  />
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
                  <img
                    alt=""
                    className="event-item-image"
                    src={events[2].image}
                  />
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
                  <img
                    alt=""
                    className="event-item-image"
                    src={events[3].image}
                  />
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
        <div className="events-content">
          <div className="event-text-row">
            <h1>More Events By {events[0].Group.name}</h1>
            <Link to="/">See All</Link>
          </div>
          <div className="events-row">
            <div className="event-item">
              <div className="event-item-image">
                <Link to={`/event/${groupEvents[1].id}`}>
                  <img
                    alt=""
                    className="event-item-image"
                    src={groupEvents[1].image}
                  />
                </Link>
              </div>
              <div className="event-item-text">
                <h3>{groupEvents[1].detailsTime}</h3>
                <h4>{groupEvents[1].name}</h4>
                <h5>{groupEvents[1].Group.name}</h5>
                <h5>
                  {groupEvents[1].Attendees.length} people are attending this
                  event
                </h5>
              </div>
            </div>
            <div className="event-item">
              <div className="event-item-image">
                <Link to={`/event/${groupEvents[2].id}`}>
                  <img
                    alt=""
                    className="event-item-image"
                    src={groupEvents[2].image}
                  />
                </Link>
              </div>
              <div className="event-item-text">
                <h3>{groupEvents[2].detailsTime}</h3>
                <h4>{groupEvents[2].name}</h4>
                <h5>{groupEvents[2].Group.name}</h5>
                <h5>
                  {groupEvents[2].Attendees.length} people are attending this
                  event
                </h5>
              </div>
            </div>
            <div className="event-item">
              <div className="event-item-image">
                <Link to={`/event/${groupEvents[3].id}`}>
                  <img
                    alt=""
                    className="event-item-image"
                    src={groupEvents[3].image}
                  />
                </Link>
              </div>
              <div className="event-item-text">
                <h3>{groupEvents[3].detailsTime}</h3>
                <h4>{groupEvents[3].name}</h4>
                <h5>{groupEvents[3].Group.name}</h5>
                <h5>
                  {groupEvents[3].Attendees.length} people are attending this
                  event
                </h5>
              </div>
            </div>
            <div className="event-item">
              <div className="event-item-image">
                <Link to={`/event/${groupEvents[4].id}`}>
                  <img
                    alt=""
                    className="event-item-image"
                    src={groupEvents[4].image}
                  />
                </Link>
              </div>
              <div className="event-item-text">
                <h3>{groupEvents[4].detailsTime}</h3>
                <h4>{groupEvents[4].name}</h4>
                <h5>{groupEvents[4].Group.name}</h5>
                <h5>
                  {groupEvents[4].Attendees.length} people are attending this
                  event
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="events-content row3">
          <div className="event-text-row">
            <h1>Other Events</h1>
            <Link to="/">See All</Link>
          </div>
          <div className="events-row">
            <div className="event-item">
              <div className="event-item-image">
                <Link to={`/event/${events[6].id}`}>
                  <img
                    alt=""
                    className="event-item-image"
                    src={events[6].image}
                  />
                </Link>
              </div>
              <div className="event-item-text">
                <h3>{events[6].detailsTime}</h3>
                <h4>{events[6].name}</h4>
                <h5>{events[6].Group.name}</h5>
                <h5>
                  {events[6].Attendees.length} people are attending this event
                </h5>
              </div>
            </div>
            <div className="event-item">
              <div className="event-item-image">
                <Link to={`/event/${events[7].id}`}>
                  <img
                    alt=""
                    className="event-item-image"
                    src={events[7].image}
                  />
                </Link>
              </div>
              <div className="event-item-text">
                <h3>{events[7].detailsTime}</h3>
                <h4>{events[7].name}</h4>
                <h5>{events[7].Group.name}</h5>
                <h5>
                  {events[7].Attendees.length} people are attending this event
                </h5>
              </div>
            </div>
            <div className="event-item">
              <div className="event-item-image">
                <Link to={`/event/${events[8].id}`}>
                  <img
                    alt=""
                    className="event-item-image"
                    src={events[8].image}
                  />
                </Link>
              </div>
              <div className="event-item-text">
                <h3>{events[8].detailsTime}</h3>
                <h4>{events[8].name}</h4>
                <h5>{events[8].Group.name}</h5>
                <h5>
                  {events[8].Attendees.length} people are attending this event
                </h5>
              </div>
            </div>
            <div className="event-item">
              <div className="event-item-image">
                <Link to={`/event/${events[9].id}`}>
                  <img
                    alt=""
                    className="event-item-image"
                    src={events[9].image}
                  />
                </Link>
              </div>
              <div className="event-item-text">
                <h3>{events[9].detailsTime}</h3>
                <h4>{events[9].name}</h4>
                <h5>{events[9].Group.name}</h5>
                <h5>
                  {events[9].Attendees.length} people are attending this event
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
