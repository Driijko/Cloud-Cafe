// IMPORTS ///////////////////////////////////////////////////////////////////////////////////////////////
import React, {useState} from "react"
import firebase from "../firebase";




export default function EditForm(props) {

  // STATE ///////////////////////////////////////////////////////////////////////////////////////////
  const [cafeName, setCafeName] = useState(props.cafeData.name);
  const [cafeCity, setCafeCity] = useState(props.cafeData.city);


  // EVENTS /////////////////////////////////////////////////////////////////////////////////////////
  function handleChange(e) {
    if (e.target.id === "editNameInput") {
      setCafeName(e.target.value);
    }
    else if (e.target.id === "editCityInput") {
      setCafeCity(e.target.value);
    } 
  }

  function handleClick(e) {
    e.preventDefault();
    firebase.firestore().collection("cafes").doc(props.cafeData.id).update({
      name: cafeName,
      city: cafeCity
    });
    props.removeForm();
  }


  // RENDER ///////////////////////////////////////////////////////////////////////////////////////
  return(
    <form>
      <hr />
      <h3>Edit a Cafe:</h3>
      <input id="editNameInput" type="text" name="name" value={cafeName} onChange={handleChange}/>
      <input id="editCityInput" type="text" name="city" value={cafeCity} onChange={handleChange}/>
      <button onClick={handleClick}>SAVE</button>
    </form>
  )
}