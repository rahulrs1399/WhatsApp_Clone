import React, { createContext, useContext, useReducer } from "react";

// Create the User Context
export const UserContext = createContext();

// Hook to use the UserContext
export const useUser = () => useContext(UserContext);

// UserProvider component to wrap around the app
export const UserProvider = ({ reducer, initialState, children }) => (
  <UserContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </UserContext.Provider>
);