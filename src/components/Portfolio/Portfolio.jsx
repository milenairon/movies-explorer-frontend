// компонент со ссылками на другие проекты

import React from "react";
import "./Portfolio.css";
import { NavLink } from "react-router-dom";
import logo from "../../images/portfolio__link-logo.svg";

export default function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__items">
        <li className="portfolio__item">
          <NavLink
            to="https://github.com/milenairon/how-to-learn"
            className="portfolio__link portfolio__link-text"
            target="_blank"
            rel="noopener noreferrer"
          >
            Статичный сайт
            <img
              className="portfolio__link portfolio__link-logo"
              src={logo}
              alt="стрелка-ссылка"
            />
          </NavLink>
        </li>
        <li className="portfolio__item">
          <NavLink
            to="https://github.com/milenairon/russian-travel"
            className="portfolio__link portfolio__link-text"
            target="_blank"
            rel="noopener noreferrer"
          >
            Адаптивный сайт
            <img
              className="portfolio__link portfolio__link-logo"
              src={logo}
              alt="стрелка-ссылка"
            />
          </NavLink>
        </li>
        <li className="portfolio__item">
          <NavLink
            to="https://github.com/milenairon/react-mesto-api-full-gha"
            className="portfolio__link portfolio__link-text"
            target="_blank"
            rel="noopener noreferrer"
          >
            Одностраничное приложение
            <img
              className="portfolio__link portfolio__link-logo"
              src={logo}
              alt="стрелка-ссылка"
            />
          </NavLink>
        </li>
      </ul>
    </section>
  );
}

