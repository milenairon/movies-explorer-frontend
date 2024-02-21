// компонент со ссылками на другие проекты
// компонент с информацией о студенте
import React from "react";
import "./Portfolio.css";
import { NavLink } from "react-router-dom";

export default function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__items">
        <li className="portfolio__item">
          <NavLink
            to="https://github.com/milenairon/how-to-learn"
            className="portfolio__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Статичный сайт
          </NavLink>
        </li>
        <li className="portfolio__item">
          <NavLink
            to="https://github.com/milenairon/russian-travel"
            className="portfolio__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Адаптивный сайт
          </NavLink>
        </li>
        <li className="portfolio__item">
          <NavLink
            to="https://github.com/milenairon/react-mesto-api-full-gha"
            className="portfolio__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Одностраничное приложение
          </NavLink>
        </li>
      </ul>
    </section>
  );
}
