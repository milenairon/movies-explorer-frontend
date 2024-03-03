// подвал.
import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__container">
        <p className="footer__text footer__text_color_other">© 2024</p>
        <div className="footer__box">
          <p className="footer__text">Яндекс.Практикум</p>
          <p className="footer__text">Github</p>
        </div>
      </div>
    </footer>
  );
}
