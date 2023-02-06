// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { useSelector } from "react-redux";
import { redirect, Route } from "react-router-dom";
import SignIn from "../../../Bin/authentication/SignIn";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Add your own authentication on the below line.
  //   const isLoggedIn = AuthService.isLoggedIn()
  //   useSelector
  const user = useSelector((state) => state.userAuthentication.user);

  const goToLogin = () => {
    redirect("/login");
  };

  return (
    <Route
      {...rest}
      action={(props) => (user === "user detected" ? <SignIn /> : goToLogin())}
    />
  );
};

export default PrivateRoute;
