import { csrfFetch } from "./csrf";

const LOAD = "groups/LOAD";
const LOAD_EVENTS = "groups/LOAD_EVENTS";

const load = (groupID = {
  type: LOAD,
  groupID,
});

export const getOneGroup = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/group/${id}`);

  if (response.ok) {
    const group = await response.json();
    return group;
  }
};
