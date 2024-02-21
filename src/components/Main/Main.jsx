// Main - компонент страницы «О проекте». Он содержит следующие компоненты:

import React from "react";
import "./Main.css";
import AboutProject from "../AboutProject/AboutProject";
import NavTab from "../NavTab/NavTab";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

export default function Main() {
  return (
    <main className="main">
      <AboutProject />
      <NavTab />
      <Promo />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}
