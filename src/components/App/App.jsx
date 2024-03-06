//React
import React from "react";
import { Routes, Route, /*Navigate ,*/ useNavigate } from "react-router-dom";

//блоки
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from "../Footer/Footer";
import OtherPages from "../OtherPages/OtherPages";
import Profile from "../Profile/Profile";
import Top from "../Top/Top";
import Login from "../Login/Login";
import Register from "../Register/Register";
//попапы
import PopupMenu from "../Popup/Popup";
//Запросы
import * as auth from "../../utils/auth";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
//прочее
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// МАССИВ КАРТОЧЕК
// карточки как массив спускаются пропсом в конкретные компоненты и отрисовываются
// при изменении состава массива (добавили лайкнутую карточку/удалили карточку) нужно пересобрать массив и обновить стейт
// - когда стейт обновится он так же отправится "вниз" по дереву компонентов и будет отрисован

function App() {
  // функциональность вся:
  const [loggedIn, setLoggedIn] = React.useState(false); // false
  const [isLoading, setIsLoading] = React.useState(false); // false
  const [readonly, setReadonly] = React.useState(true); // true
  const [savedMovies, setSavedMovies] = React.useState(true); // false
  const [pageSavedMovies, setPageSavedMovies] = React.useState(false); // false
  const [isPopupMenuOpen, setIsPopupMenuOpen] = React.useState(false);
  const isSomePopupOpen = isPopupMenuOpen; // + "|| другой попап || еще другой попап"
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState(null);
  const [movies, setMovies] = React.useState([]);

  //ОТКРЫТЬ ПОПАПЫ
  function openPopupMenu() {
    setIsPopupMenuOpen(true);
  }

  // ЗАКРЫТЬ ПОПАПЫ
  //закрыть попап на темный фон
  const handleOverlayClose = React.useCallback((event) => {
    if (event.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }, []);

  //закрытие на esc
  const handleCloseByEsc = React.useCallback((event) => {
    if (event.key === "Escape") {
      closeAllPopups();
    }
  }, []);

  //закрыть все попапы(если будут еще)
  function closeAllPopups() {
    setIsPopupMenuOpen(false);
  }

  //закрытие попапа на темный фон и esc
  React.useEffect(() => {
    if (isSomePopupOpen) {
      document.addEventListener("keydown", handleCloseByEsc);
      document.addEventListener("click", handleOverlayClose);
      return () => {
        document.removeEventListener("keydown", handleCloseByEsc);
        document.removeEventListener("click", handleOverlayClose);
      };
    }
  }, [isSomePopupOpen]);

  const [formValue, setFormValue] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  // УДАЛИТЬ ТОКЕН
  function handleLoggedInFalse() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/signup");
  }

  //ИЗМЕНЕНИЕ ИНПУТОВ
  function handleChangeInput(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  // //ПРОВЕРКА ТОКЕНА (чтобы не входить, если не выходил из системы)
  // function tokenCheck() {
  //   // если у пользователя есть токен в localStorage,
  //   // эта функция проверит валидность токена
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     // проверим токен
  //     return auth
  //       .checkValidityToken(jwt)
  //       .then((res) => {
  //         if (res) {
  //           // авторизуем пользователя
  //           setLoggedIn(true);
  //           // setEmailName(res.email);
  //           navigate("/movies", { replace: true });
  //         }
  //       })
  //       .catch((error) => {
  //         //если запрос не ушел
  //         console.log(error);
  //       });
  //   }
  // }

  //РЕГИСТРАЦИЯ
  function handleSubmitRegister(e) {
    e.preventDefault();
    auth
      .register(formValue.name, formValue.email, formValue.password)
      .then((res) => {
        if (res) {
          onLogin();
          console.log("Вы успешно зарегистрировались!");
        } else {
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //ВХОД В СИСТЕМУ
  function handleSubmitLogin(e) {
    e.preventDefault();
    onLogin();
  }

  function onLogin() {
    auth
      .authorize(formValue.email, formValue.password)
      .then((res) => {
        if (res) {
          // setEmailName(formValue.email); // поменять эмэйл на пришедший эмэйл на странице
          setLoggedIn(true);
          navigate("/movies", { replace: true });
          console.log("Вы успешно вошли на страницу!");
        } else {
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // получение карточек и данных юзера
  function getUsersAMovies() {
    if (loggedIn) {
      return Promise.all([
        mainApi.getUserInfo(),
        mainApi.getSavedMovies(),
      ]).then(([user, moviesList]) => {
        setCurrentUser(user);
        console.log(user);
        setMovies(moviesList);
        console.log(moviesList);
      });
    }
  }

  async function EnterWithoutSign() {
    try {
      // await tokenCheck(); // токен
      await getUsersAMovies(); // получение фильмов и данных юзера
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      EnterWithoutSign();
    }
  }, [navigate]);

  // //вставить данные из формы
  // function handleUpdateUser({ name, about }) {
  //   api
  //     .setUserInfo({ name, job: about })
  //     .then((user) => {
  //       setCurrentUser(user);
  //       closeAllPopups();
  //     })
  //     .catch((error) => {
  //       //если запрос не ушел
  //       console.log(error);
  //     });
  // }

  // //поменять картинку аватара
  // function handleUpdateAvatar(avatar) {
  //   api
  //     .setUserAvatar(avatar)
  //     .then((user) => {
  //       setCurrentUser(user);
  //       closeAllPopups();
  //     })
  //     .catch((error) => {
  //       //если запрос не ушел
  //       console.log(error);
  //     });
  // }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header loggedIn={loggedIn} isOpenPopupMenu={openPopupMenu} />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route
              path="/movies"
              element={
                <>
                  <Header loggedIn={loggedIn} isOpenPopupMenu={openPopupMenu} />
                  <Movies
                    isLoading={isLoading}
                    savedMovies={savedMovies}
                    movies={movies}
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <>
                  <Header loggedIn={loggedIn} isOpenPopupMenu={openPopupMenu} />
                  <SavedMovies
                    savedMovies={savedMovies}
                    pageSavedMovies={pageSavedMovies}
                    movies={movies}
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Header loggedIn={loggedIn} isOpenPopupMenu={openPopupMenu} />
                  <Profile
                    loggedIn={loggedIn}
                    readonly={readonly}
                    removeJwt={handleLoggedInFalse}
                  />
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <>
                  <Top text="Рады видеть!" />
                  <Login
                    handleChangeInput={handleChangeInput}
                    onSubmit={handleSubmitLogin}
                    email={formValue.email}
                    password={formValue.password}
                  />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Top text="Добро пожаловать!" />
                  <Register
                    handleChangeInput={handleChangeInput}
                    onSubmit={handleSubmitRegister}
                    name={formValue.name}
                    email={formValue.email}
                    password={formValue.password}
                  />
                </>
              }
            />
            {/*replace возвращает новую строку с некоторыми или всеми сопоставлениями с шаблоном, заменёнными на заменитель*/}
            <Route path="*" element={<OtherPages />} />
          </Routes>
          <PopupMenu onClose={closeAllPopups} isOpen={isPopupMenuOpen} />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
