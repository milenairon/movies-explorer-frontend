// Регистрация

import React from "react";
import "./Register.css";
import { NavLink } from "react-router-dom";

export default function Register({ handleChangeInput }) {
  return (
    <main className="register">
      <form name="formRegister" className="register__form">
        <label className="register__label">
          <span className="register__input-name">Имя</span>
          <input
            className="register__input"
            // register__input_type_error
            type="text"
            name="name"
            minLength={2}
            maxLength={30}
            required={true}
            onChange={handleChangeInput}
            pattern="[A-Za-zА-Яа-яЁё\s-]+"
          />
          <span className="register__input-error-message-live name-input-error-message register__input-error-message-live_visible">
            ошибка маил
          </span>
        </label>
        <label className="register__label">
          <span className="register__input-name">E-mail</span>
          <input
            className="register__input"
            // register__input_type_error
            type="email"
            name="email"
            minLength={5}
            maxLength={40}
            required={true}
            onChange={handleChangeInput}
            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
          />
          <span className="register__input-error-message-live email-input-error-message register__input-error-message-live_visible">
            ошибка маил
          </span>
        </label>
        <label className="register__label">
          <span className="register__input-name">Пароль</span>
          <input
            className="register__input"
            // register__input_type_error
            type="password"
            name="password"
            minLength={2}
            maxLength={10}
            required={true}
            onChange={handleChangeInput}
          />
          <span className="register__input-error-message-live password-input-error-message register__input-error-message-live_visible">
            ошибка маил
          </span>
        </label>
        <button
          aria-label="Зарегистрироваться"
          className="register__button"
          type="submit"
        >
          Зарегистрироваться
        </button>
        <div className="register__box">
          <p className="register__text">Уже зарегистрированы?</p>
          <NavLink to="/signin" className="register__link">
            Войти
          </NavLink>
        </div>
      </form>
    </main>
  );
}
