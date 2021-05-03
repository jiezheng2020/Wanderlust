import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "./Groups.css";
import { getOneGroup, addGroupMember } from "../../store/groups";

export default function Groups() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [joinedGroup, setjoinGroup] = useState(false);
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

  useEffect(() => {
    dispatch(getOneGroup(id));
  }, [dispatch, joinedGroup, id]);

  const JoinGroup = async () => {
    const payload = {
      userId: sessionUser.id,
      groupId: parseInt(id, 10),
    };

    await dispatch(addGroupMember(payload));
    setjoinGroup(!joinedGroup);
  };

  if (!group || !groupMembers || !groupEvents) return null;

  const joinGroupBool =
    groupMembers?.filter((user) => user?.id === sessionUser?.id).length === 0;

  const organizerBool = sessionUser?.id === group?.organizerId;

  return (
    <div className="group-page">
      <div className="group-content">
        <img alt="" className="group-image" src={group.image} />
        <div className="group-content-text">
          <div className="group-content-group">
            <h1>{group.name}</h1>
            <p>{groupMembers.length} members | Public Group</p>
            <p>Organized by {group.User.username}</p>
            <p>Located at {group.location}</p>
            {!organizerBool && sessionUser && joinGroupBool && (
              <button className="join-group-btn" onClick={() => JoinGroup()}>
                Join Group
              </button>
            )}
            {!joinGroupBool && !organizerBool && (
              <p className="group-member-confirm">
                You are a member of this group
              </p>
            )}
            {organizerBool && (
              <p className="group-member-confirm">
                You are the owner of this group
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="group-about">
        <h2>What we're about</h2>
        <div className="group-about-text">{group.description}</div>
      </div>
      <div className="upcoming-events-container">
        {group.Calendars?.length !== 0 && (
          <>
            <h2>Upcoming Events({groupEvents.length})</h2>
            <div className="upcoming-events">
              <div className="test">
                {group.Calendars.map((event, i) => {
                  return (
                    <Link key={i} to={`/event/${event.id}`}>
                      <div className="event-row">
                        <img alt="" src={event.image} />
                        <div className="event-row-text">
                          <h4 className="event-row-time">
                            {event.detailsTime}
                          </h4>
                          <h3>{event.name}</h3>
                          <h4 className="event-row-body">
                            {event.detailsBody}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        )}
        {group.Calendars?.length === 0 && (
          <div className="no-groups">
            This group currently has no events organized
          </div>
        )}
      </div>
    </div>
  );
}
