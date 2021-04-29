import { csrfFetch } from "./csrf";

const LOAD = "events/LOAD";
const LOAD_ONE = "events/LOAD_ONE";

const load = (events) => ({
  type: LOAD,
  events,
});

const loadOne = (event) => ({
  type: LOAD_ONE,
  event,
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
  const response = await csrfFetch(`api/event/${id}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const comment = response.json();
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
    default:
      return state;
  }
};

export default eventReducer;
