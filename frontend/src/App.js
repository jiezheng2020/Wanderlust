import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage";
import Authorized from "./components/Authorized";
import Event from "./components/Event";
import Groups from "./components/Groups";
import UserProfile from "./components/UserProfile";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/authorized">
            <Authorized />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/event/:id">
            <Event />
          </Route>
          <Route path="/group/:id">
            <Groups />
          </Route>
          <Route path="/user-profile">
            <UserProfile />
          </Route>
          <Route exact path="/event/all"></Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
