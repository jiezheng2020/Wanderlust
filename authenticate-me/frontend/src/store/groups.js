import { csrfFetch } from "./csrf";

const LOAD = "groups/LOAD";
const ADD_MEMBER = "groups/ADD_MEMBER";

const load = (group) => ({
  type: LOAD,
  group,
});

const add = (payload) => ({
  type: ADD_MEMBER,
  payload,
});

export const getOneGroup = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/group/${id}`);

  if (response.ok) {
    const group = await response.json();
    dispatch(load(group));
  }
};

export const addGroupMember = (payload) => async (dispatch) => {
  const { groupId } = payload;
  const response = await csrfFetch(`/api/group/${groupId}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const member = await response.json();
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
