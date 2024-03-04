// подвал.
import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__container">
        <p className="footer__text footer__text_color_other">© 2024</p>
        <div className="footer__box">
          <NavLink
            to="https://practicum.yandex.ru/"
            className="footer__text footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Яндекс.Практикум
          </NavLink>
          <NavLink
            to="https://github.com/"
            className="footer__text footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </NavLink>
        </div>
      </div>
    </footer>
  );
}
