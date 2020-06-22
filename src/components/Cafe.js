import React from "react";

export default function Cafe(props) {
  return (
    <li>
      <span>{props.cafeData.name}</span>
      <span>{props.cafeData.city}</span>
    </li>
  )
}