import React from "react";
import "./Top.css";
import { NavLink } from "react-router-dom";

export default function Top({text}) {
  return (
    <header className="top">
      <NavLink to="/" className="top__logo" />
      <h1 className="top__title">{text}</h1>
    </header>
  );
}
