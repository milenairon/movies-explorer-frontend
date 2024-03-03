import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Header({ loggedIn, isOpenPopupMenu }) {
  // ПОПАП С НАВИГАЦИЕЙ ПО САЙТУ
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  if (width > 768) {
    return (
      <header className="header">
        {loggedIn ? (
          <nav className="header__navigation">
            <NavLink
              to="/"
              className="header__link header__link-logo"
            ></NavLink>
            <Navigation />
            <NavLink
              to="/profile"
              className="header__link header__link-profile"
            >
              Аккаунт
            </NavLink>
          </nav>
        ) : (
          <nav className="header__navigation">
            <NavLink to="/" className="header__link header__link-logo" />
            <ul className="header__navigation-unauthorized-items">
              <li className="header__navigation-unauthorized-item">
                <NavLink
                  to="/signup"
                  className="header__link header__link-register"
                >
                  Регистрация
                </NavLink>
              </li>
              <li className="header__navigation-unauthorized-item">
                <NavLink
                  to="/signin"
                  className="header__link header__link-login"
                >
                  Войти
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </header>
    );
  }

  return (
    <header className="header">
      {loggedIn ? (
        <nav className="header__navigation">
          <NavLink to="/" className="header__link header__link-logo" />
          <button onClick={isOpenPopupMenu} aria-label="Меню" className="header__popup" type="button" />
        </nav>
      ) : (
        <nav className="header__navigation">
          <NavLink to="/" className="header__link header__link-logo" />
          <ul className="header__navigation-unauthorized-items">
            <li className="header__navigation-unauthorized-item">
              <NavLink
                to="/signup"
                className="header__link header__link-register"
              >
                Регистрация
              </NavLink>
            </li>
            <li className="header__navigation-unauthorized-item">
              <NavLink to="/signin" className="header__link header__link-login">
                Войти
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
