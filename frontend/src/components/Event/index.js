import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "./Event.css";
import {
  getOneEvent,
  createEventComment,
  removeComment,
  changeComment,
  addEventMember,
} from "../../store/events";

export default function Event() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const event = useSelector((state) => {
    return state.events.event;
  });

  const [addcomment, setaddComment] = useState("");
  const [userComment, setuserComment] = useState(false);
  const [joinedEvent, setjoinEvent] = useState(false);
  const [edit, setEdit] = useState(false);
  const [updatedComment, setupdatedComment] = useState("");
  const [currentComment, setCurrentComment] = useState(-1);

  useEffect(() => {
    dispatch(getOneEvent(id));
  }, [dispatch, userComment, id, joinedEvent]);

  if (!event) return null;

  const groupImg = event.Group?.image;
  const attendees = event.Attendees;

  const joinedEventBool =
    attendees?.filter((user) => user?.id === sessionUser?.id).length === 0;

  const AddComment = async () => {
    if (addcomment.length) {
      setaddComment("");
      const payload = {
        eventId: id,
        userId: sessionUser.id,
        body: addcomment,
        sessionUser,
      };

      await dispatch(createEventComment(payload));
      setuserComment(!userComment);
    }
  };

  async function UpdateComment(commentId, index) {
    setEdit(!edit);
    const payload = {
      eventId: id,
      commentId,
      userId: sessionUser.id,
      body: updatedComment,
      sessionUser,
      index,
    };

    await dispatch(changeComment(payload));
    setuserComment(!userComment);
  }

  async function EditComment(comment, i) {
    setEdit(!edit);
    setCurrentComment(i);
    setupdatedComment(comment);
  }
  async function Remove(commentId, index) {
    const payload = {
      eventId: id,
      commentId,
      userId: sessionUser.id,
      index,
    };

    await dispatch(removeComment(payload));
    setuserComment(!userComment);
  }

  const JoinEvent = async () => {
    const payload = {
      userId: sessionUser.id,
      eventId: parseInt(id, 10),
    };

    await dispatch(addEventMember(payload));
    setjoinEvent(!joinedEvent);
  };

  return (
    <div className="event-page">
      <div className="event-header">
        <h4 className="event-header-time">{event.detailsTime}</h4>
        <h2>{event.name}</h2>
        <h4>Hosted by {event.User.username}</h4>
        {sessionUser && joinedEventBool && (
          <button className="request-btn" onClick={() => JoinEvent()}>
            Join Event
          </button>
        )}
        {sessionUser && !joinedEventBool && (
          <p className="joined-event-text">You are RSVP'd for the event</p>
        )}
      </div>
      <div className="event-column-container">
        <div className="event-column-1">
          <div>
            <img alt="" className="event-image" src={event.image} />
          </div>
          <div className="event-details">
            <h2>Details</h2>
            <p className="event-details-p">{event.detailsBody}</p>
          </div>
          <div className="event-attendees">
            <h3>{`Attendees (${event.Attendees.length})`}</h3>
            <div className="attendees-container">
              <div className="attendees-div">Attendees1</div>
              <div className="attendees-div">Attendees1</div>
              <div className="attendees-div">Attendees1</div>
              <div className="attendees-div">Attendees1</div>
            </div>
          </div>
          <h3 className="1comment-title">{`Comments(${event.Comments.length})`}</h3>
          <div className="event-comments">
            {event.Comments?.map((comment, i) => {
              return (
                <div className="event-comment-box" key={i}>
                  <label className="comment-username">
                    {comment.username}:{" "}
                  </label>
                  <label>{comment.Comment.body}</label>
                  {sessionUser?.id === comment.id && (
                    <div className="edit-delete">
                      {!edit && (
                        <>
                          <button
                            className="edit-btn"
                            onClick={() => EditComment(comment.Comment.body, i)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => Remove(comment.Comment.id, i)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                      {edit && currentComment === i && (
                        <div className="update-area">
                          <textarea
                            className="edit-textarea"
                            value={updatedComment}
                            onChange={(e) => setupdatedComment(e.target.value)}
                          ></textarea>
                          <button
                            className="update-btn"
                            onClick={() => UpdateComment(comment.Comment.id, i)}
                          >
                            Update
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {sessionUser && (
            <div className="comment-submit">
              <textarea
                placeholder="Please enter a comment here"
                onChange={(e) => setaddComment(e.target.value)}
                value={addcomment}
              ></textarea>
              <button onClick={AddComment}>Add</button>
            </div>
          )}
        </div>
        <div className="event-column-2">
          <div className="event-content-text">
            <div className="event-content-group">
              <Link to={`/group/${event.groupId}`}>
                <img alt="" className="event-group-img" src={groupImg} />
              </Link>
              <div className="event-text-container">
                <div className="event-group-text">
                  <label>{event.Group.name}</label>
                  <p>Public group</p>
                </div>
                <div className="event-content-time">
                  <label>Event will take place on {event.detailsTime}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
