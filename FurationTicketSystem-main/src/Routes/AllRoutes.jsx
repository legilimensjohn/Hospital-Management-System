import PrivateRoute from "./PrivateRoute";
import Login from "../Pages/Login";
import SignupPage from "../Pages/SignupPage";
import SeatSlot from "../Pages/SeatSlot";
import Home from "../Pages/Home";
import { Route, Routes } from "react-router-dom";
import AllTickets from "../Pages/AllTickets";
import MyTicket from "../Pages/MyTicket";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignupPage />} />
      <Route path="/bus/:id" element={<SeatSlot />} />
      <Route path="/alltickets" element={<AllTickets />} />
      <Route path="/myticket" element={<MyTicket />} />

      <Route
        path="/myticket"
        element={
          <PrivateRoute>
            <MyTicket />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
