// userActions.js
import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./user.types.js";

// User registration action creator
export const register = (userData) => async (dispatch) => {
  console.log("active", userData);
  try {
    const response = await axios.post(
      "https://bookingsystem-uqfx.onrender.com/users",
      userData
    );
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  }
};

// User login action creator
export const login = (userData, nav) => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://bookingsystem-uqfx.onrender.com/users"
    );
    console.log("res", response);
    const user = response.data.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );
    console.log("users", user);
    if (user) {
      localStorage.setItem("token", user.password);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: LOGIN_SUCCESS, payload: user });
      nav("/");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

// User logout action creator
export const logout = () => ({ type: LOGOUT });
