import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";

import userReducer from "./users/user.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { ticketReducer } from "./tickets/tickets.reducer";

let rootReducer = combineReducers({
  userReducer: userReducer,
  ticketReducer:ticketReducer,
  cartReducer: cartReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
