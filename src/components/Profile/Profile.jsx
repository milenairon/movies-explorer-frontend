// компонент страницы изменения профиля.

import React from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({
  loggedIn,
  removeJwt,
  isValid,
  errors,
  onSubmit,
  handleChangeInput,
  disabledInput,
  handleDisabledInput,
  formValue,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="profile" id="profile">
      <h1 className="profile__title">
        Привет, {currentUser ? currentUser.name : ""}!
      </h1>
      <form name="formProfile" className="profile__form" onSubmit={onSubmit}>
        <label className="profile__label">
          <span className="profile__input-name">Имя</span>
          <input
            className={`profile__input ${
              errors.name ? "profile__input_type_error" : ""
            }`}
            type="text"
            name="name"
            minLength={2}
            maxLength={30}
            required={true}
            placeholder="Имя"
            pattern="[А-Яа-яA-Za-z\s\-Ёё]+"
            onChange={handleChangeInput}
            value={formValue.name}
            disabled={disabledInput}
          ></input>
        </label>
        <label className="profile__label">
          <span className="profile__input-name">E-mail</span>
          <input
            className={`profile__input ${
              errors.email ? "profile__input_type_error" : ""
            }`}
            type="email"
            name="email"
            minLength={5}
            maxLength={40}
            required={true}
            placeholder="Почта"
            value={formValue.email}
            disabled={disabledInput}
            onChange={handleChangeInput}
            pattern="^(http(s){0,1}:\/\/.){0,1}[\-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)$"
          ></input>
        </label>
        {loggedIn && disabledInput ? (
          <>
            <button
              aria-label="Редактировать"
              className="profile__button"
              type="button"
              onClick={handleDisabledInput}
            >
              Редактировать
            </button>
            <button
              aria-label="Выйти из аккаунта"
              className="profile__button profile__button_color_main"
              type="button"
              onClick={removeJwt}
            >
              Выйти из аккаунта
            </button>
          </>
        ) : (
          <>
            <span
              className={`profile__input-error-message-web ${
                errors.name || errors.email
                  ? "profile__input-error-message-web_visible"
                  : ""
              }`}
            >
              {errors.name || errors.email}
            </span>
            <button
              aria-label="Сохранить"
              disabled={!isValid}
              className={`profile__button-save ${
                isValid ? "" : "profile__button-save_disabled"
              }`}
              type="submit"
            >
              Сохранить
            </button>
          </>
        )}
      </form>
    </main>
  );
}
