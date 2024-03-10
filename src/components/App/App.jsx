//React
import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

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
// import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute"


function App() {
  // функциональность вся:
  const [loggedIn, setLoggedIn] = React.useState(false); // false
  const [isLoading, setIsLoading] = React.useState(false); // false
  const [savedMovies, setSavedMovies] = React.useState([]); // массив сохраненных фильмов
  const [onSavedMovies, setOnSavedMovies] = React.useState(false); //Фильм сохранен?  // false
  const [isPopupMenuOpen, setIsPopupMenuOpen] = React.useState(false);
  const isSomePopupOpen = isPopupMenuOpen; // + "|| другой попап || еще другой попап"
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState(null);
  const [movies, setMovies] = React.useState([]);
  const location = useLocation();
  const [buttonAddMovies, setButtonAddMovies] = React.useState(false);
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

  React.useEffect(() => {
    tokenCheck();
  }, []);

  //ПОЛУЧИТЬ В САХРАНЕННЫЕ ФИЛЬМЫ
  async function getSavedMovies() {
    try {
      const res = await mainApi.getSavedMovies();
      const data = await res;
      setSavedMovies(data);
    } catch (err) {
      console.error(
        `Что-то пошло не так при получении сохраненных карточек: ${err}`
      );
    }
  }

  React.useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.error(`Данные пользователя не получены: ${err}`);
        });
      getSavedMovies();
      // if (JSON.parse(localStorage.getItem('filteredMovies'))) {
      //   setMovies(JSON.parse(localStorage.getItem('filteredMovies')));
      //   setChecked(JSON.parse(localStorage.getItem('checkbox')));
      //   setCheckedSaveMovies(
      //     JSON.parse(localStorage.getItem('checkboxSaveMovies'))
      //   );
      // }
    }
  }, [loggedIn]);

  const [formValue, setFormValue] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  // УДАЛИТЬ ТОКЕН
  function handleLoggedInFalse() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/");
  }

  //ИЗМЕНЕНИЕ ИНПУТОВ
  function handleChangeInput(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  //Сохранить данные формы в профиле
  function onUpdateUserInfo(name, email) {
    mainApi
      .updateUserInfo({ name, email })
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        if (err.status === 409) {
          console.error("Пользователь с таким email уже существует.");
        } else {
          console.error("При обновлении профиля произошла ошибка.");
        }
      });
  }

  //ПРОВЕРКА ТОКЕНА (чтобы не входить, если не выходил из системы)
  function tokenCheck() {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // проверим токен
      return auth
        .checkValidityToken(jwt)
        .then((res) => {
          if (res) {
            // авторизуем пользователя
            setLoggedIn(true);
            navigate(location.pathname);
          }
        })
        .catch((error) => {
          //если запрос не ушел
          console.error(error);
        });
    }
  }

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
        console.error(err);
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
          setLoggedIn(true);
          navigate("/movies", { replace: true });
          console.log("Вы успешно вошли на страницу!");
        } else {
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

// Получить все карточки со стороннего сайта
  React.useEffect(() => {
    if (!localStorage.getItem("movies")) {
      moviesApi
        .getAllMovies()
        .then((movies) => {
          localStorage.setItem("movies", JSON.stringify(movies));
        })
        .then(() => {
          setMovies(JSON.parse(localStorage.getItem("movies")));
          setButtonAddMovies(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);
  function getAllMovies() {
    setMovies(JSON.parse(localStorage.getItem("movies")));
    setButtonAddMovies(true);
  }
  function handleSubmitSearchForm(e) {
    e.preventDefault();
    getAllMovies();
  }

  // ДЕЙСТВИЯ С ФИЛЬМАМИ
  //СОХРАНИТЬ ФИЛЬМ
  function handleSaveMovies(movie) {
    if (!onSavedMovies) {
      mainApi
        .addMovie(movie)
        .then((data) => {
          setSavedMovies([data, ...savedMovies]);
          console.log("Фильм сохранен!");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  //УДАЛИТЬ ФИЛЬМ
  function handleDeleteMovies(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((movies) =>
          movies.filter((savedMovie) => movie._id !== savedMovie._id)
        );
        // setOnSavedMovies(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

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
                loggedIn ? (
                  <>
                    <Header
                      loggedIn={loggedIn}
                      isOpenPopupMenu={openPopupMenu}
                    />
                    <Movies
                      isLoading={isLoading}
                      onDelete={handleDeleteMovies}
                      movieList={movies}
                      savedMovieList={savedMovies}
                      handleSubmitSearchForm={handleSubmitSearchForm}
                      buttonAddMovies={buttonAddMovies}
                      setButtonAddMovies={setButtonAddMovies}
                      onSave={handleSaveMovies}
                      // setOnSavedMovie={handleSetOnSavedMovie}
                      // getOnSavedMovie={getOnSavedMovie}
                    />
                    <Footer />
                  </>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/saved-movies"
              element={
                loggedIn ? (
                  <>
                    <Header
                      loggedIn={loggedIn}
                      isOpenPopupMenu={openPopupMenu}
                    />
                    <SavedMovies
                      isLoading={isLoading}
                      onDelete={handleDeleteMovies}
                      movieList={movies}
                      savedMovieList={savedMovies}
                      handleSubmitSearchForm={handleSubmitSearchForm}
                      buttonAddMovies={buttonAddMovies}
                      setButtonAddMovies={setButtonAddMovies}
                      onSave={handleSaveMovies}
                      onSavedMovies={onSavedMovies}
                    />
                    <Footer />
                  </>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/profile"
              element={
                loggedIn ? (
                  <>
                    <Header
                      loggedIn={loggedIn}
                      isOpenPopupMenu={openPopupMenu}
                    />
                    <Profile
                      loggedIn={loggedIn}
                      removeJwt={handleLoggedInFalse}
                      onUpdateUserInfo={onUpdateUserInfo}
                    />
                  </>
                ) : (
                  <Navigate to="/" replace />
                )
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
