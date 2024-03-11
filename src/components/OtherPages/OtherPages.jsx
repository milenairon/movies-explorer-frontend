// страница 404
import React from "react";
import "./OtherPages.css";
import { useNavigate } from "react-router-dom";

export default function OtherPages() {
  const navigate = useNavigate();
  function returnPreviousPage() {
    navigate(-3);
  }

  return (
    <section className="other-pages">
      <div className="other-pages__box">
        <h2 className="other-pages__title">404</h2>
        <p className="other-pages__text">Страница не найдена</p>
      </div>
      <button className="other-pages__button" onClick={returnPreviousPage}>
        Назад
      </button>
    </section>
  );
}
