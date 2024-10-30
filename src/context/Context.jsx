import React, { createContext, useState, useEffect } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);

  return (
    <Context.Provider value={{
      progress, setProgress,
    }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
