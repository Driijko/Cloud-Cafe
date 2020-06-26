import React, {createContext, useState, useEffect} from "react";
import firebase from "../firebase";

const Context = createContext();

function ContextProvider(props) {

  const [cafes, setCafes] = useState();

  useEffect(()=> {
    firebase.firestore().collection("cafes").orderBy("name").onSnapshot(snapshot => {
      const newCafes = snapshot.docs.map((doc)=> {
        return (
          {
            id: doc.id,
            ...doc.data()
          }
        )
      }
    )
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