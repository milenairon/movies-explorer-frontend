// презентационный компонент, который отрисовывает подвал.
// компонент со ссылками на другие проекты
// компонент с информацией о студенте
import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__container">
        <p className="footer__text">© 2020</p>
        <div className="footer__box">
          <p className="footer__text">Яндекс.Практикум</p>
          <p className="footer__text">Github</p>
        </div>
      </div>
    </footer>
  );
}
