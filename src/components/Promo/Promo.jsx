// компонент с вёрсткой баннера страницы «О проекте»

import React from "react";
import "./Promo.css";

export default function Promo() {
  return (
    <section className="promo" id="promo">
      <h2 className="promo__title">О проекте</h2>
      <div className="promo__boxs">
        <div className="promo__box">
          <h3 className="promo__text">Дипломный проект включал 5 этапов</h3>
          <p className="promo__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="promo__box">
          <h3 className="promo__text">На выполнение диплома ушло 5 недель</h3>
          <p className="promo__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="promo__container">
        <p className="promo__time-dev promo__time-dev_color_main">1 неделя</p>
        <p className="promo__time-dev">4 недели</p>
        <p className="promo__text-dev">Back-end</p>
        <p className="promo__text-dev">Front-end</p>
      </div>
    </section>
  );
}
