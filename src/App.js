// IMPORTS ///////////////////////////////////////////////////////////////////////////////
import React, {useContext, useEffect, useState} from 'react';
import firebase from "./firebase";

import Context from "./store/Context";

import Cafe from "./components/Cafe";
import EditForm from "./components/EditForm";




export default function App() {

  // STATE ///////////////////////////////////////////////////////////////////////////////
  // Data
  const {cafes} = useContext(Context);

  // Cafe List Components
  const [cafeComponents, setCafeComponents] = useState(<div>LOADING DATA...</div>)
  useEffect(()=> {
    if (cafes) {
      setCafeComponents(cafes.map(cafe=> {
        return <Cafe cafeData={{name: cafe.name, city: cafe.city, id: cafe.id}} key={cafe.id} handleClick={handleClick}/>
     }))
    }
  }, [cafes])

  // Edit Form Component
  const [editFormComponent, setEditFormComponent] = useState(null)

  // Input
  const [newCafeName, setNewCafeName] = useState("");
  const [newCafeCity, setNewCafeCity] = useState("");


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
      });
      setNewCafeName("");
      setNewCafeCity("");
    }
    else if (e.target.id === "deleteButton") {
      let id = e.target.parentElement.id;
      firebase.firestore().collection("cafes").doc(id).delete();
    }
    else if (e.target.id === "editButton") {
      const cafeName = e.target.parentElement.childNodes[0].innerHTML;
      const cafeCity = e.target.parentElement.childNodes[1].innerHTML;
      const cafeId = e.target.parentElement.id;
      setEditFormComponent(<EditForm cafeData={{name: cafeName, city: cafeCity, id: cafeId}} removeForm={removeForm}/>)
    }
  }

  function removeForm() {
    setEditFormComponent(null)
  }


  // RENDER //////////////////////////////////////////////////////////////////////////////
  return (
    <div className="App">
      <h1>Cloud Cafe</h1>
      <div className="content">

        <form id="add-cafe-form">
          <input type="text" name="name" placeholder="Cafe Name" onChange={handleChange} value={newCafeName}/>
          <input type="text" name="city" placeholder="Cafe City" onChange={handleChange} value={newCafeCity}/>
          <button id="addCafeButton" onClick={handleClick}>Add Cafe</button>
        </form>

        <ul id="cafe-list">
          {cafeComponents}
        </ul>

        {editFormComponent}

      </div>
      
      
    </div>
  );
}