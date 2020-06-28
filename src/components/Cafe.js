import React from "react";

export default function Cafe(props) {
  return (
    <li id={props.cafeData.id}>
      <span>{props.cafeData.name}</span>
      <span>{props.cafeData.city}</span>
      <div id="deleteButton" onClick={props.handleClick}>x</div>
      <div id="editButton">edit</div>
    </li>
  )
}