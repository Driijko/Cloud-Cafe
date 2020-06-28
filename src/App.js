// IMPORTS ///////////////////////////////////////////////////////////////////////////////
import React, {useContext, useEffect, useState} from 'react';
import firebase from "./firebase";

import Context from "./store/Context";

import Cafe from "./components/Cafe";

// COMPONENT /////////////////////////////////////////////////////////////////////////////
function App() {

  // STATE ///////////////////////////////////////////////////////////////////////////////
  // Data
  const {cafes} = useContext(Context);

  // Components
  const [cafeComponents, setCafeComponents] = useState(<div>LOADING DATA...</div>)
  useEffect(()=> {
    if (cafes) {
      setCafeComponents(cafes.map(cafe=> {
        return <Cafe cafeData={{name: cafe.name, city: cafe.city, id: cafe.id}} key={cafe.id} handleClick={handleClick}/>
     }))
    }
  }, [cafes])

  // Input
  const [newCafeName, setNewCafeName] = useState(null);
  const [newCafeCity, setNewCafeCity] = useState(null);


  // EVENTS ////////////////////////////////////////////////////////////////////////////
  function handleChange(e) {
    if (e.target.name === "name") {
      setNewCafeName(e.target.value);
    }
    else if (e.target.name === "city") {
      setNewCafeCity(e.target.value);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    if (e.target.id === "addCafeButton") {
      firebase.firestore().collection("cafes").add({
        name: newCafeName,
        city: newCafeCity
      })
    }
    if (e.target.id === "deleteButton") {
      let id = e.target.parentElement.id;
      console.log(id);
      firebase.firestore().collection("cafes").doc(id).delete();
    }
  }


  // RENDER //////////////////////////////////////////////////////////////////////////////
  return (
    <div className="App">
      <h1>Cloud Cafe</h1>
      <div className="content">

        <form id="add-cafe-form">
          <input type="text" name="name" placeholder="Cafe Name" onChange={handleChange} />
          <input type="text" name="city" placeholder="Cafe City" onChange={handleChange} />
          <button id="addCafeButton" onClick={handleClick}>Add Cafe</button>
        </form>

        <ul id="cafe-list">
          {cafeComponents}
        </ul>

      </div>
      
      
    </div>
  );
}

export default App;
