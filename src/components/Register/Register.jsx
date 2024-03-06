// Регистрация

import React from "react";
import "./Register.css";
import { NavLink } from "react-router-dom";

export default function Register({
  handleChangeInput,
  onSubmit,
  name,
  email,
  password,
}) {
  return (
    <main className="register">
      <form name="formRegister" className="register__form" onSubmit={onSubmit}>
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
            value={name}
            placeholder="Имя"
            onChange={handleChangeInput}
            // pattern="[A-Za-zА-Яа-яЁё\s-]+"
          />
          <span className="register__input-error-message-live name-input-error-message register__input-error-message-live_visible"></span>
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
            value={email}
            placeholder="Почта"
            onChange={handleChangeInput}
            // pattern="[A-z0-9!#$%&'*+-/=?^_`{|]{1,64}@[A-z0-9-.]{2,253}\\.[A-z]{2,63}"
          />
          <span className="register__input-error-message-live email-input-error-message register__input-error-message-live_visible"></span>
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
            value={password}
            placeholder="Пароль"
            onChange={handleChangeInput}
          />
          <span className="register__input-error-message-live password-input-error-message register__input-error-message-live_visible"></span>
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
