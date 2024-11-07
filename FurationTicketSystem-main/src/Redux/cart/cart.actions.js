import axios from "axios";
import { useSelector } from "react-redux";
import { store } from "../store";
import { LOGOUT } from "../users/user.types";
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
const storeduser = JSON.parse(localStorage.getItem("user"));
console.log("storeduser", storeduser);

export const AddCart =
  (singledata, setNumber, updatedCart) => async (dispatch) => {
    dispatch({ type: CREATE_CART_LOADING });
console.log("updatedCart",updatedCart)
    let obj = storeduser;
    // obj.cart = [...obj.cart, { ...singledata, seatnumer: setNumber }];
    obj.cart = [...updatedCart, { ...singledata, seatnumer: setNumber }];
    try {
      const res = await axios.patch(
        `https://bookingsystem-uqfx.onrender.com/users/${storeduser.id}`,
        obj
      );
      let data = res.data;
      if (data) {
        dispatch({ type: CREATE_CART_SUCCESS, payload: data });
      } else {
        dispatch({ type: CREATE_CART_ERROR });
      }
    } catch (error) {
      dispatch({ type: GET_CART_ERROR });
    }
  };

export const GetCart = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://bookingsystem-uqfx.onrender.com/users"
    );

    const user = response.data.find(
      (user) =>
        user.email === storeduser.email && user.password === storeduser.password
    );

    if (user) {
      console.log("user", user);
      const cartData = user.cart; // Modify this line to access the cart data from the user object
      dispatch({ type: GET_CART_SUCCESS, payload: cartData });
    } else {
      alert("Invalid email or password. Please try again.");
    }
  } catch (error) {
    dispatch({ type: GET_CART_ERROR, payload: error.message });
  }
};

export const deleteCart = (cartItemId, CartData) => async (dispatch) => {
  dispatch({ type: DELETE_CART_LOADING });

  try {
    const res = await axios.patch(
      `https://bookingsystem-uqfx.onrender.com/users/${storeduser.id}`,
      {
        ...storeduser,
        cart: CartData?.filter((item) => item.id !== cartItemId),
      }
    );

    const data = res.data.cart;
    console.log("data", data);
    if (data) {
      dispatch({ type: DELETE_CART_SUCCESS, payload: data });
    } else {
      dispatch({ type: DELETE_CART_ERROR });
    }
  } catch (error) {
    dispatch({ type: DELETE_CART_ERROR });
  }
};
