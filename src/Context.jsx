import React, {useState} from 'react';
export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({ infoText: "" , errorText:""});
  return (
    <AppContext.Provider value={{ globalState, setGlobalState }}>
      {" "}
      {children}{" "}
    </AppContext.Provider>
  );
};