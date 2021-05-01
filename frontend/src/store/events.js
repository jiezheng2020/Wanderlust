import { csrfFetch } from "./csrf";

const LOAD = "events/LOAD";
const LOAD_ONE = "events/LOAD_ONE";
const ADD_COMMENT = "events/ADD_COMMENT";
const DELETE_COMMENT = "events/DELETE_COMMENT";
const EDIT_COMMENT = "events/EDIT_COMMENT";

const load = (events) => ({
  type: LOAD,
  events,
});

const loadOne = (event) => ({
  type: LOAD_ONE,
  event,
});

const addComment = (comment, sessionUser) => ({
  type: ADD_COMMENT,
  comment,
  sessionUser,
});

const deleteComment = (index) => ({
  type: DELETE_COMMENT,
  index,
});

const editComment = (comment, index, sessionUser) => ({
  type: EDIT_COMMENT,
  comment,
  index,
  sessionUser,
});

const sortEvent = (events) => {
  return events
    .sort((eventsA, eventsB) => {
      return eventsB.Attendees.length - eventsA.Attendees.length;
    })
    .map((event) => event);
};

export const getEvents = () => async (dispatch) => {
  const response = await csrfFetch("/api/event");

  if (response.ok) {
    const events = await response.json();
    dispatch(load(events));
  }
};

export const getOneEvent = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/event/${id}`);

  if (response.ok) {
    const event = await response.json();
    dispatch(loadOne(event));
    return event;
  }
};

export const removeComment = (payload) => async (dispatch) => {
  const { eventId, commentId, index } = payload;
  const response = await csrfFetch(`/api/event/${eventId}/comment`, {
    method: "DELETE",
    body: JSON.stringify({ commentId }),
  });
  if (response.ok) {
    dispatch(deleteComment(index));
  }
};

export const changeComment = (payload) => async (dispatch) => {
  const { eventId, commentId, userId, body, sessionUser, index } = payload;
  const response = await csrfFetch(`/api/event/${eventId}/comment`, {
    method: "PUT",
    body: JSON.stringify({ eventId, commentId, userId, body }),
  });
  if (response.ok) {
    const newComment = await response.json();
    dispatch(editComment(newComment, index, sessionUser));
  }
};

export const createEventComment = (payload) => async (dispatch) => {
  const id = payload.eventId;
  const { eventId, userId, body, sessionUser } = payload;
  const response = await csrfFetch(`/api/event/${id}/comment`, {
    method: "POST",
    body: JSON.stringify({ eventId, userId, body }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const comment = await response.json();
    dispatch(addComment(comment, sessionUser));
    return comment;
  }
};

export const addEventMember = (payload) => async (dispatch) => {
  const { eventId } = payload;
  const response = await csrfFetch(`/api/event/${eventId}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const member = await response.json();
    return member;
  }
};

const eventReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        events: sortEvent(action.events),
      };
    }
    case LOAD_ONE: {
      return {
        ...state,
        event: action.event,
      };
    }
    case ADD_COMMENT: {
      const newState = { ...state };
      const commentId = newState.event.Comments.length;
      newState.event.Comments[commentId] = {
        ...action.sessionUser,
        Comment: action.comment,
      };
      return newState;
    }
    case EDIT_COMMENT: {
      const newState = { ...state };
      const commentId = action.index;
      newState.event.Comments[commentId] = {
        ...action.sessionUser,
        Comment: action.comment,
      };
      return newState;
    }

    case DELETE_COMMENT: {
      const newState = { ...state };
      const commentId = action.index;
      delete newState.event.Comments[commentId];
      return newState;
    }
    default:
      return state;
  }
};

export default eventReducer;
