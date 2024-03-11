// компонент страницы изменения профиля.

import React from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// import { NavLink } from "react-router-dom";
export default function Profile({ loggedIn, removeJwt, onUpdateUserInfo }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser ? currentUser.name : "");
  const [email, setEmail] = React.useState(
    currentUser ? currentUser.email : ""
  );
  // только для чтения
  const [disabledInput, setDisabledInput] = React.useState(true); // true

  //name
  function handleChangeName(e) {
    setName(e.target.value);
  }

  //email
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  // сделать инпуты открытыми для редактирования
  function handleDisabledInput() {
    setDisabledInput(false);
  }

  // сделать инпуты открытыми для редактирования
  function handleUnDisabledInput() {
    setDisabledInput(true);
  }

  // сохранить измененные данные при сабмите
  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      onUpdateUserInfo(currentUser.name, email);
      handleUnDisabledInput();
    } else if (!email) {
      onUpdateUserInfo(name, currentUser.email);
      handleUnDisabledInput();
    } else {
      onUpdateUserInfo(name, email);
      handleUnDisabledInput();
    }
  }

  // вставить в инпуты значение
  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  return (
    <main className="profile" id="profile">
      <h1 className="profile__title">Привет, {name}!</h1>
      <form
        name="formProfile"
        className="profile__form"
        onSubmit={handleSubmit}
      >
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
            onChange={handleChangeName}
            value={name}
            disabled={disabledInput}
          ></input>
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
            value={email}
            onChange={handleChangeEmail}
            pattern="[A-z0-9!#$%&'*+-/=?^_`{|]{1,64}@[A-z0-9-.]{2,253}\\.[A-z]{2,63}"
            disabled={disabledInput}
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
