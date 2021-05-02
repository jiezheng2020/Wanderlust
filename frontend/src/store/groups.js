import { csrfFetch } from "./csrf";

const LOAD = "groups/LOAD";
const LOAD_ALL = "groups/LOAD_ALL";
const LOAD_USER = "groups/LOAD_USER";

const load = (group) => ({
  type: LOAD,
  group,
});

const loadAll = (groups) => ({
  type: LOAD_ALL,
  groups,
});

const loadUser = (groups) => ({
  type: LOAD_USER,
  groups,
});

export const getGroups = () => async (dispatch) => {
  const response = await csrfFetch("/api/group");

  if (response.ok) {
    const groups = await response.json();
    dispatch(loadAll(groups));
  }
};

export const getUserGroups = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/group/user/${id}`);

  if (response.ok) {
    const groups = await response.json();
    dispatch(loadUser(groups));
  }
};
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
    return member;
  }
};

export const addNewGroup = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/group/`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const newGroup = await response.json();
    return newGroup;
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
    case LOAD_ALL: {
      return {
        ...state,
        groups: action.groups,
      };
    }
    case LOAD_USER: {
      return {
        ...state,
        UserGroups: action.groups,
      };
    }
    default:
      return state;
  }
};

export default groupReducer;
