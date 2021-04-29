import { csrfFetch } from "./csrf";

const LOAD = "events/LOAD";

const load = (events) => ({
  type: LOAD,
  events,
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

const eventReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        events: sortEvent(action.events),
      };
    }
    default:
      return state;
  }
};

export default eventReducer;
