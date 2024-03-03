// компонент, который отвечает за меню навигации на сайте.

import React from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <section className="navigation">
      <ul className="navigation__authorized-items">
        <li className="navigation__authorized-item">
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive
                ? "navigation__link navigation__link_active"
                : "navigation__link"
            }
          >
            Фильмы
          </NavLink>
        </li>
        <li className="navigation__authorized-item">
          <NavLink
            to="/saved-movies"
            className={({ isActive }) =>
              isActive
                ? "navigation__link navigation__link_active"
                : "navigation__link"
            }
          >
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
    </section>
  );
}
