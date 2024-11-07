import {
  CREATE_CART_ERROR,
  CREATE_CART_LOADING,
  CREATE_CART_SUCCESS,
  DELETE_CART_ERROR,
  DELETE_CART_LOADING,
  DELETE_CART_SUCCESS,
  GET_CART_ERROR,
  GET_CART_LOADING,
  GET_CART_SUCCESS,
} from "./cart.types";

let initialState = {
  loading: false,
  error: false,
  data: [],
};

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CART_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_CART_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };
    }

    case GET_CART_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    case CREATE_CART_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case CREATE_CART_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }

    case CREATE_CART_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    case DELETE_CART_LOADING: {
      return {
        ...state,
        loading: true,
        
      };
    }

    case DELETE_CART_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };
    }

    case DELETE_CART_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    default: {
      return state;
    }
  }
};
