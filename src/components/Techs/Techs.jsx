// компонент с использованными технологиями

import React from "react";
import "./Techs.css";

export default function Techs({ loggedIn }) {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title">Технологии</h2>
      <p className="techs__subtitle">7 технологий</p>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__items">
        <li className="techs__item">
          <p className="techs__tech">HTML</p>
        </li>
        <li className="techs__item">
          <p className="techs__tech">CSS</p>
        </li>
        <li className="techs__item">
          <p className="techs__tech">JS</p>
        </li>
        <li className="techs__item">
          <p className="techs__tech">React</p>
        </li>
        <li className="techs__item">
          <p className="techs__tech">Git</p>
        </li>
        <li className="techs__item">
          <p className="techs__tech">Express.js</p>
        </li>
        <li className="techs__item">
          <p className="techs__tech">mongoDB</p>
        </li>
      </ul>
    </section>
  );
}
