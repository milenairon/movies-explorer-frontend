// компонент с навигацией по странице «О проекте»
import React from "react";
import "./NavTab.css";

export default function NavTab() {
  return (
    <section className="nav-tab">
      <nav className="nav-tab__navigation">
        <ul className="nav-tab__navigation-items">
          <li className="nav-tab__navigation-item">
            <a href="#promo" className="nav-tab__link">
              О проекте
            </a>
          </li>
          <li className="nav-tab__navigation-item">
            <a href="#techs" className="nav-tab__link">
              Технологии
            </a>
          </li>
          <li className="nav-tab__navigation-item">
            <a href="#about-me" className="nav-tab__link">
              Студент
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}
