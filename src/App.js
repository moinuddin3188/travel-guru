import React, { useState, createContext } from 'react';
import './App.css';
import Home from './Component/Home/Home';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Booking from './Component/Booking/Booking';
import Login from './Component/Login/Login';
import AfterBooking from './Component/AfterBooking/AfterBooking';
import Nomatch from './Component/Nomatch/Nomatch';
import PrivetRoute from './Component/PrivetRoute/PrivetRoute';

export const UserContext = createContext();

function App() {

  const [user, setUser] = useState({
    spotName: "",
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    error: "",
    success: false,
    navbarWhite: true
  })

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <PrivetRoute path="/booking/:spotId">
            <AfterBooking/>
          </PrivetRoute>
          <Route path="/spot/:spotName">
            <Booking/>
          </Route>
          <Route path="*">
            <Nomatch/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
