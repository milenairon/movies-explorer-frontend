import React from "react";
import "./Top.css";
import image from "../../images/logo.svg";

export default function Top({text}) {
  return (
    <header className="top">
      <img className="top__logo" src={image} alt="логотип - зеленое кольцо" />
      <h1 className="top__title">{text}</h1>
    </header>
  );
}
