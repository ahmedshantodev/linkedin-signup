import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Registration from "./pages/registration/Registration";
import Login from "./pages/login/Login";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/home/Home";
import ForgetPassword from "./pages/forgotPassword/ForgotPassword";

const App = () => {
  let router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="" element={<Registration />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
      </Route>
    )
  );

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
