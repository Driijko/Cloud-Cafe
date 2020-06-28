// IMPORTS ////////////////////////////////////////////////////////////////////////////
import React, {createContext, useState, useEffect} from "react";
import firebase from "../firebase";

// CREATE CONTEXT /////////////////////////////////////////////////////////////////////
const Context = createContext();



function ContextProvider(props) {

  // LOCAL DATABASE ///////////////////////////////////////////////////////////////////
  const [cafes, setCafes] = useState();

  // LOAD DATA FROM FIRESTORE ////////////////////////////////////////////////////////
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


  // SHARE DATA ACROSS APP ////////////////////////////////////////////////////////////////
  return (
    <Context.Provider value={{cafes}}>
      {props.children}
    </Context.Provider>
  )
}

// EXPORTS /////////////////////////////////////////////////////////////////////////////////
export default Context;
export {ContextProvider};