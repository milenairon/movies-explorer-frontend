// компонент с информацией о студенте
import React from "react";
import "./AboutMe.css";
import photo from "../../images/foto.jpeg";
import { NavLink } from "react-router-dom";

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__box">
        <div className="about-me__box-text">
          <p className="about-me__name">Елена</p>
          <p className="about-me__specialization">
            Фронтенд-разработчик, 26 лет
          </p>
          <p className="about-me__paragraph">
            Я живу в Новосибирске, закончила специалитет по направлению
            "Строительство уникальных зданий и сооружений" на факультете
            строительства в НГАСУ(Сибстрин). Я замужем. Люблю планировать свою
            жизнь, наводить красоту вокруг себя, встречаться с друзьями и
            верстать крутые сайты. Недавно начала кодить. Прошла курс по
            веб-разработке на платформе Яндекс Практикум, в поисках постоянной
            работы, где я смогу быть полезной и реализоваться как хороший
            специалист.
          </p>
          <NavLink
            to="https://github.com/milenairon"
            className="about-me__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </NavLink>
        </div>
        <img
          className="about-me__photo"
          src={photo}
          alt="Фотография студента"
        />
      </div>
    </section>
  );
}

