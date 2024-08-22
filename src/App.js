import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { auth } from "./firebase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useReducer } from "react";
import Login from "./login";
import { UserProvider, useUser } from "./UserContext";

// Initial state and reducer for User
const initialState = {
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, [dispatch]);

  return (
    <UserProvider initialState={initialState} reducer={reducer}>
      <div className="app">
        {!state.user ? (
          <Login />
        ) : (
          <div className="app__body">
            <Router>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Sidebar />
                      <Chat />
                    </>
                  }
                >
                <Route path="room/:roomId" element={<Chat />} />
                </Route>
              </Routes>
            </Router>
          </div>
        )}
      </div>
    </UserProvider>
  );
}

export default App;
