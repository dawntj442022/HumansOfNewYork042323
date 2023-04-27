import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useStore } from "../store";
import { getUserData } from "../store/user";
import HomePage from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import UserPage from "../pages/UserPage";
import Navigation from "./Navigation";
import Footer from "./Footer";

function App() {
  const history = useHistory();
  const user = useStore((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserData(token).catch((error) => {
        console.error("Error getting user data:", error);
        localStorage.removeItem("token");
      });
    } else {
      history.push("/login");
    }
  }, [history]);

  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/users/:id" component={UserPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
