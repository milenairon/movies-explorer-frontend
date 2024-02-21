import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

export default function Header({ loggedIn }) {
  return (
    <header className="header">
      {loggedIn ? (
        <nav className="header__navigation">
          <NavLink to="/" className="header__link-logo"></NavLink>
          <ul className="header__navigation-authorized-items">
            <li className="header__navigation-authorized-item">
              <NavLink to="/movies" className="header__link">
                Фильмы
              </NavLink>
            </li>
            <li className="header__navigation-authorized-item">
              <NavLink to="/saved-movies" className="header__link">
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <NavLink to="/profile" className="header__link-profile">
            Аккаунт
          </NavLink>
        </nav>
      ) : (
        <nav className="header__navigation">
          <NavLink to="/" className="header__link-logo" />
          <ul className="header__navigation-unauthorized-items">
            <li className="header__navigation-unauthorized-item">
              <NavLink to="/signup" className="header__link-register">
                Регистрация
              </NavLink>
            </li>
            <li className="header__navigation-unauthorized-item">
              <NavLink to="/signin" className="header__link-login">
                Войти
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
