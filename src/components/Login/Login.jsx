// Авторизация (вход)

import React from "react";
import "./Login.css";
import { NavLink } from "react-router-dom";

export default function Login() {
  return (
    <main className="login">
      <form name="formLogin" className="login__form">
        <label className="login__label">
          <span className="login__input-name">E-mail</span>
          <input
            className="login__input login__input_type_error"
            type="email"
            name="email"
            minLength={5}
            maxLength={40}
            required={true}
            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
          />
          <span className="login__input-error-message-live email-input-error-message register__input-error-message-live_visible">
            ошибка
          </span>
        </label>
        <label className="login__label">
          <span className="login__input-name">Пароль</span>
          <input
            className="login__input login__input_type_error"
            type="password"
            name="password"
            minLength={2}
            maxLength={10}
            required={true}
          />
          <span className="login__input-error-message-live password-input-error-message register__input-error-message-live_visible">
            ошибка
          </span>
        </label>
        <button aria-label="Войти" className="login__button" type="submit">
          Войти
        </button>
        <div className="login__box">
          <p className="login__text">Ещё не зарегистрированы?</p>
          <NavLink to="/signup" className="login__link">
            Регистрация
          </NavLink>
        </div>
      </form>
    </main>

  );
}
