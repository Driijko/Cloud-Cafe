import React, {createContext, useState, useEffect} from "react";
import firebase from "../firebase";

const Context = createContext();

function ContextProvider(props) {

  const [cafes, setCafes] = useState("hello");

  useEffect(()=> {
    firebase.firestore().collection("cafes").onSnapshot(snapshot=> {
      const newCafes = snapshot.docs.map((doc)=> ({
        id: doc.id,
        ...doc.data()
      }))
      setCafes(newCafes);
    })
  }, [])



  return (
    <Context.Provider value={{cafes}}>
      {props.children}
    </Context.Provider>
  )
}

export default Context;
export {ContextProvider};