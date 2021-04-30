import { csrfFetch } from "./csrf";

const LOAD = "groups/LOAD";
const LOAD_EVENTS = "groups/LOAD_EVENTS";

const load = (group) => ({
  type: LOAD,
  group,
});

export const getOneGroup = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/group/${id}`);

  if (response.ok) {
    const group = await response.json();
    dispatch(load(group));
    return group;
  }
};

const groupReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        ...action.group,
      };
    }
    default:
      return state;
  }
};

export default groupReducer;
