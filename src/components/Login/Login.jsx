// Авторизация (вход)

import React from "react";
import "./Login.css";
import { NavLink } from "react-router-dom";

export default function Login({
  handleChangeInput,
  onSubmit,
  email,
  password,
}) {
  return (
    <main className="login">
      <form name="formLogin" className="login__form" onSubmit={onSubmit}>
        <label className="login__label">
          <span className="login__input-name">E-mail</span>
          <input
            className="login__input login__input_type_error"
            type="email"
            name="email"
            minLength={5}
            maxLength={40}
            required={true}
            value={email}
            placeholder="Почта"
            onChange={handleChangeInput}
            // pattern="[A-z0-9!#$%&'*+-/=?^_`{|]{1,64}@[A-z0-9-.]{2,253}\\.[A-z]{2,63}"
          />
          <span className="login__input-error-message-live email-input-error-message login__input-error-message-live_visible"></span>
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
            value={password}
            placeholder="Пароль"
            onChange={handleChangeInput}
          />
          <span className="login__input-error-message-live password-input-error-message login__input-error-message-live_visible"></span>
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
