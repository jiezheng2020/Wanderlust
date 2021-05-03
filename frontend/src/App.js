import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage";
import Authorized from "./components/Authorized";
import Event from "./components/Event";
import AllEvents from "./components/AllEvents";
import Groups from "./components/Groups";
import AllGroups from "./components/AllGroups";
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
          <Route exact path="/authorized">
            <Authorized />
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/event/:id">
            <Event />
          </Route>
          <Route exact path="/group/:id">
            <Groups />
          </Route>
          <Route exact path="/user-profile">
            <UserProfile />
          </Route>
          <Route exact path="/events/all">
            <AllEvents />
          </Route>
          <Route exact path="/groups/all">
            <AllGroups />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
