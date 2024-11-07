import {
  GET_TICKETS_ERROR,
  GET_TICKETS_LOADING,
  GET_TICKETS_SUCCESS,
  GET_BUSID_SUCCESS,
} from "./ticekts.types.js";

let initialState = {
  loading: false,
  error: false,
  data: [],
  BUSID: {},
};

export const ticketReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TICKETS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_TICKETS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };
    }

    case GET_TICKETS_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    case GET_BUSID_SUCCESS: {
     
      return {
        ...state,
        loading: false,
        error: false,
        BUSID: payload,
      };
    }

    default: {
      return state;
    }
  }
};
