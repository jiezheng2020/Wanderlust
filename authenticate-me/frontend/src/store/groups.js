import { csrfFetch } from "./csrf";

const LOAD = "groups/LOAD";
const LOAD_EVENTS = "groups/LOAD_EVENTS";

const load = (groupId) => ({
  type: LOAD,
  groupId,
});

const loadEvents = (events) => ({
  type: LOAD_EVENTS,
  events,
});

export const getOneGroup = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/group/${id}`);

  if (response.ok) {
    const group = await response.json();
    return group;
  }
};

export const getAllEvents = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/group/${id}/events`);

  if (response.ok) {
    const listEvents = await response.json();
  }
};
