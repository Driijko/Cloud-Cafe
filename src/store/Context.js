import React, {createContext, useState} from "react";

const Context = createContext();

function ContextProvider(props) {

  const [test, setTest] = useState("hello");

  return (
    <Context.Provider value={{test}} >
      {props.children}
    </Context.Provider>
  )
}

export default Context;
export {ContextProvider};