import usersReducer from "../reducers/useReducer";
import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
} from "../actions/userActions";

describe("usersReducer", () => {
  it("should return the initial state", () => {
    const initialState = {
      users: [],
      loading: false,
      error: null,
    };
    const action = { type: "UNKNOWN_ACTION" };

    const newState = usersReducer(undefined, action);

    expect(newState).toEqual(initialState);
  });

  it("should handle FETCH_USERS_REQUEST", () => {
    const initialState = {
      users: [],
      loading: false,
      error: null,
    };
    const action = { type: FETCH_USERS_REQUEST };

    const newState = usersReducer(initialState, action);

    expect(newState).toEqual({
      users: [],
      loading: true,
      error: null,
    });
  });

  it("should handle FETCH_USERS_SUCCESS", () => {
    const initialState = {
      users: [],
      loading: true,
      error: null,
    };
    const action = {
      type: FETCH_USERS_SUCCESS,
      payload: [
        { id: 1, name: "John" },
        { id: 2, name: "Jane" },
      ],
    };

    const newState = usersReducer(initialState, action);

    expect(newState).toEqual({
      users: [
        { id: 1, name: "John" },
        { id: 2, name: "Jane" },
      ],
      loading: false,
      error: null,
    });
  });

  it("should handle FETCH_USERS_FAILURE", () => {
    const initialState = {
      users: [],
      loading: true,
      error: null,
    };
    const action = {
      type: FETCH_USERS_FAILURE,
      payload: "Error message",
    };

    const newState = usersReducer(initialState, action);

    expect(newState).toEqual({
      users: [],
      loading: false,
      error: "Error message",
    });
  });
});
