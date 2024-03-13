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
  isValid,
  errors,
}) {
  return (
    <main className="register">
      <form
        name="formRegister"
        className="register__form"
        onSubmit={onSubmit}
        noValidate
      >
        <label className="register__label">
          <span className="register__input-name">Имя</span>
          <input
            className={`register__input ${
              errors.name ? "register__input_type_error" : ""
            }`}
            type="text"
            name="name"
            minLength={2}
            maxLength={30}
            required={true}
            value={name}
            pattern="[А-Яа-яA-Za-z\s\-Ёё]+"
            placeholder="Имя"
            onChange={handleChangeInput}
          />
          <span
            className={`register__input-error-message-live ${
              errors.name ? "register__input-error-message-live_visible" : ""
            }`}
          >
            {errors.name}
          </span>
        </label>
        <label className="register__label">
          <span className="register__input-name">E-mail</span>
          <input
            className={`register__input ${
              errors.email ? "register__input_type_error" : ""
            }`}
            type="email"
            name="email"
            minLength={5}
            maxLength={40}
            required={true}
            value={email}
            placeholder="Почта"
            onChange={handleChangeInput}
            pattern="^(http(s){0,1}:\/\/.){0,1}[\-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)$"
          />
          <span
            className={`register__input-error-message-live ${
              errors.email ? "register__input-error-message-live_visible" : ""
            }`}
          >
            {errors.email}
          </span>
        </label>
        <label className="register__label">
          <span className="register__input-name">Пароль</span>
          <input
            className={`register__input ${
              errors.password ? "register__input_type_error" : ""
            }`}
            type="password"
            name="password"
            minLength={2}
            maxLength={10}
            required={true}
            value={password}
            placeholder="Пароль"
            onChange={handleChangeInput}
          />
          <span
            className={`register__input-error-message-live ${
              errors.password
                ? "register__input-error-message-live_visible"
                : ""
            }`}
          >
            {errors.password}
          </span>
        </label>
        <button
          disabled={!isValid}
          aria-label="Зарегистрироваться"
          className={`register__button ${
            isValid ? "" : "register__button_disabled"
          }`}
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
