import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../store/events";
import { Link } from "react-router-dom";
import "./AllEvents.css";

export default function AllEvents() {
  const dispatch = useDispatch();
  const [numEvents, setNumEvents] = useState(10);
  const events = useSelector((state) => {
    return state.events.events?.map((eventId) => eventId);
  });

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  if (!events) return null;
  console.log(events);

  return (
    <div className="all-events-page">
      <h1>All Events</h1>
      <div className="all-events-container">
        {events.slice(0, numEvents).map((event, i) => (
          <Link key={i} to={`/event/${event.id}`}>
            <div className="user-groups-row">
              <img alt="" src={event.image} />
              <div className="user-row-text">
                <div className="user-row-header">
                  <h4 className="user-row-time">{event.detailsTime}</h4>
                </div>
                <h3>{event.name}</h3>
                <h4 className="user-row-body">{event.detailsBody}</h4>
              </div>
            </div>
          </Link>
        ))}
        <div className="load-container">
          {events.length > numEvents && (
            <div
              className="load-more"
              onClick={() => setNumEvents(numEvents + 10)}
            >
              Load More
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
