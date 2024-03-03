// компонент страницы изменения профиля.

import React from "react";
import "./Profile.css";
// import { NavLink } from "react-router-dom";

export default function Profile({ name, loggedIn, readonly }) {
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
            placeholder={/*currentUser.name*/ "Виталий"}
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
            placeholder={/*currentUser.email*/ "какая-то-почта@mail.ru"}
            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
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
              type="submit"
            >
              Выйти из аккаунта
            </button>
          </>
        ) : (
          <>
            <span className="profile__input-error-message-web">
            {/* profile__input-error-message-web_visible */}
              общая ошибка
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
