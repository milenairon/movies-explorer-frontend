// Попап с открывающимся меню-навигацией при ширине экрана < 768px

import React from "react";
import "./Popup.css";
import { NavLink } from "react-router-dom";
import popupCloseIcon from "../../images/popup__button-close.svg";

export default function Popup({ name, onClose, isOpen }) {
  return (
    <div
      className={`popup popup_place_${name} ${!isOpen ? "" : "popup_opened"}`}
    >
      <div className={`popup__container popup__container_place_${name}`}>
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__button-close"
          onClick={onClose}
        >
          <img
            className="popup__close-icon"
            src={popupCloseIcon}
            alt="Крестик закрытия"
          />
        </button>
        <div className="popup__box">
          <NavLink
            className={({ isActive }) =>
              isActive ? "popup__link popup__link_active" : "popup__link"
            }
            to="/"
            onClick={onClose}
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? "popup__link popup__link_active" : "popup__link"
            }
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            onClick={onClose}
            className={({ isActive }) =>
              isActive
                ? "popup__link popup__link_size_m popup__link_active"
                : "popup__link popup__link_size_m"
            }
          >
            Сохранённые фильмы
          </NavLink>
        </div>
        <NavLink
          to="/profile"
          className="popup__link-profile"
          onClick={onClose}
        >
          Аккаунт
        </NavLink>
      </div>
    </div>
  );
}
