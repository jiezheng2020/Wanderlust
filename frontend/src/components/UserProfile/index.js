import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "./UserProfile.css";
import {
  getEvents,
  getUserEvents,
  removeEventMember,
} from "../../store/events";
import {
  getGroups,
  getUserGroups,
  removeGroupMember,
} from "../../store/groups";

export default function UserProfile() {
  const dispatch = useDispatch();
  const [removed, setRemoved] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const events = useSelector((state) => state.events.events);

  const userEvents = useSelector((state) => state.events.UserEvents);

  const groups = useSelector((state) => state.group.groups);

  const userGroups = useSelector((state) => state.group.UserGroups);

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getUserEvents(sessionUser.id));
    dispatch(getGroups());
    dispatch(getUserGroups(sessionUser.id));
  }, [dispatch, removed]);

  const GroupleaveBtn = async (groupId) => {
    const payload = {
      groupId: groupId,
      userId: sessionUser.id,
    };
    await dispatch(removeGroupMember(payload));
    setRemoved(!removed);
  };

  const EventleaveBtn = async (eventId) => {
    const payload = {
      eventId: eventId,
      userId: sessionUser.id,
    };
    await dispatch(removeEventMember(payload));
    setRemoved(!removed);
  };
  if (!sessionUser) return <Redirect to="/"></Redirect>;
  if (!events || !userEvents || !groups || !userGroups) return null;

  const userEventsArray = userEvents?.map((el) => el.eventId);

  const userJoinedEvents = events.filter(
    (event) =>
      userEventsArray.includes(event.id) || event.hostId === sessionUser.id
  );

  const userGroupsArray = userGroups.map((el) => el.groupId);

  const userJoinedGroups = groups.filter(
    (group) =>
      userGroupsArray.includes(group.id) || group.organizerId === sessionUser.id
  );

  return (
    <div className="userprof-home">
      <div className="user-info">
        <h2>Username: {sessionUser.username}</h2>
        <h2>Email: {sessionUser.email}</h2>
      </div>
      <div className="user-joined-container">
        <div className="container-div">
          <h2>User Groups({userJoinedGroups.length})</h2>
          <div className="user-groups">
            {userJoinedGroups.map((group, i) => {
              return (
                <>
                  <div className="leave-container">
                    <button
                      className="leave-btn"
                      onClick={() => GroupleaveBtn(group.id)}
                    >
                      Leave
                    </button>
                  </div>
                  <Link key={i} to={`/group/${group.id}`}>
                    <div className="user-groups-row">
                      <img alt="" src={group.image} />
                      <div className="user-row-text">
                        <div className="user-row-header">
                          <h4 className="user-row-time">{group.location}</h4>
                        </div>
                        <h3>{group.name}</h3>
                        <h4 className="user-row-body">{group.description}</h4>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </div>

        <div className="container-div">
          <h2>User Events({userJoinedEvents.length})</h2>
          <div className="user-events">
            {userJoinedEvents.map((event, i) => {
              return (
                <>
                  <div className="leave-container">
                    <button
                      className="leave-btn"
                      onClick={() => EventleaveBtn(event.id)}
                    >
                      Leave
                    </button>
                  </div>
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
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
