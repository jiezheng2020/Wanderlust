import { csrfFetch } from "./csrf";

const LOAD = "events/LOAD";

const load = (events) => ({
  type: LOAD,
  events,
});

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
      //   const allEvents = [];
      //   action.events.forEach((event) => {
      //     allEvents[event.id] = event;
      //   });

      return {
        ...state,
        events: action.events,
      };
    }
    default:
      return state;
  }
};

export default eventReducer;
