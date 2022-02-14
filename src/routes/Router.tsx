import React, {useEffect, useState} from "react";
import {Provider} from "react-redux";
import {Route, Router as WouterRouter} from "wouter";
import Navbar from "../components/layout/navbar/Navbar";
import store from "../store/store";
import Join from "./auth/Join";
import Welcome from "./welcome/Welcome";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase";
import Home from "./home/Home";
import Account from "./account/Account";

const Router: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        //TODO: watch for changes in chats
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  return (
      <div>
        <Provider store={store}>
          <Navbar/>
          <WouterRouter>
            <Route path="/">{loggedIn ? <Home/> : <Welcome/>}</Route>
            <Route path="/join">
              <Join/>
            </Route>
            <Route path="/account">
              <Account/>
            </Route>
          </WouterRouter>
        </Provider>
      </div>
  );
};

export default Router;
