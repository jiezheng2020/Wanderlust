import { csrfFetch } from "./csrf";

const LOAD = "events/LOAD";
const LOAD_ONE = "events/LOAD_ONE";
const ADD_COMMENT = "events/ADD_COMMENT";

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

export const createEventComment = (payload) => async (dispatch) => {
  const id = payload.eventId;
  const { eventId, userId, body, sessionUser } = payload;
  const response = await csrfFetch(`/api/event/${id}`, {
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
    default:
      return state;
  }
};

export default eventReducer;
