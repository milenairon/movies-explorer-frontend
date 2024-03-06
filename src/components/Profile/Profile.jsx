// компонент страницы изменения профиля.

import React from "react";
import "./Profile.css";
// import { NavLink } from "react-router-dom";

export default function Profile({ name, loggedIn, readonly, removeJwt }) {
  // const currentUser = useContext(CurrentUserContext);
  return (
    <main className="profile" id="profile">
      <h1 className="profile__title">Привет, {/*currentUser.name*/}Виталий!</h1>
      <form name="formProfile" className="profile__form">
        <label className="profile__label">
          <span className="profile__input-name">Имя</span>
          <input
            className="profile__input"
            type="text"
            name="name"
            minLength={2}
            maxLength={30}
            required={true}
            placeholder="Имя"
            pattern="[A-Za-zА-Яа-яЁё\s-]+"
          />
        </label>
        <label className="profile__label">
          <span className="profile__input-name">E-mail</span>
          <input
            className="profile__input"
            type="email"
            name="email"
            minLength={5}
            maxLength={40}
            required={true}
            placeholder="Почта"
            pattern="[A-z0-9!#$%&'*+-/=?^_`{|]{1,64}@[A-z0-9-.]{2,253}\\.[A-z]{2,63}"
          />
        </label>
        {loggedIn && readonly ? (
          <>
            <button
              aria-label="Редактировать"
              className="profile__button"
              type="submit"
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
            <span className="profile__input-error-message-web">
              {/* profile__input-error-message-web_visible */}
            </span>
            <button
              aria-label="Сохранить"
              className="profile__button-save"
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
