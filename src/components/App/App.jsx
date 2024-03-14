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

function App() {
  // функциональность вся:
  const [loggedIn, setLoggedIn] = React.useState(false); // false
  const [isLoading, setIsLoading] = React.useState(false); // false
  const [savedMovies, setSavedMovies] = React.useState([]); // массив сохраненных фильмов
  const [savedMoviesFilter, setSavedMoviesFilter] = React.useState([]); // массив сохраненных фильмов отфильтрованный
  const [arrMovies, setArrMovies] = React.useState(true); // есть ли массив на странице с фильмами?
  const [arrSavedMovies, setArrSavedMovies] = React.useState(false); // есть ли массив на странице с сохраненными фильмами?
  const [isPopupMenuOpen, setIsPopupMenuOpen] = React.useState(false);
  const isSomePopupOpen = isPopupMenuOpen; // + "|| другой попап || еще другой попап"
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState(null); // или {}????????????????????????
  const [movies, setMovies] = React.useState([]); // массив фильмов, которые пойдут на страницу
  const location = useLocation();
  const [buttonAddMovies, setButtonAddMovies] = React.useState(false);
  //Валидация
  const [errorTextMovies, setErrorTextMovies] = React.useState(false);
  const [errorTextSavedMovies, setErrorTextSavedMovies] = React.useState(false);
  const [isValidSearch, setIsValidSearch] = React.useState(true);
  const [isValid, setIsValid] = React.useState(false);
  const [errors, setErrors] = React.useState(false);
  const [disabledInput, setDisabledInput] = React.useState(true); // true
  //Изменение инпута поисковой строки
  const [searchFormValue, setSearchFormValue] = React.useState("");
  // изменение чекбокса
  const [checkboxSaved, setCheckboxSaved] = React.useState(false);
  //Изменение инпутов
  const [formValue, setFormValue] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [inputChange, setInputChange] = React.useState({
    name: false,
    email: false,
  });
  //Изменение кнопки чекбокс Короткометражек
  const [checkbox, setCheckbox] = React.useState(false);

  //ИЗМЕНЕНИЕ ИНПУТОВ
  function handleChangeInput(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    setInputChange({ ...inputChange, [name]: true });
    setIsValid(e.target.closest("form").checkValidity());
    if (location.pathname === "/profile") {
      if (currentUser.name === value) {
        setErrors({
          name: "Введите, пожалуйста, имя, отличное от предыдущего",
        });
        setIsValid(false);
      } else if (currentUser.email === value) {
        setErrors({
          email: "Введите, пожалуйста, почту, отличную от предыдущей",
        });
        setIsValid(false);
      } else {
        setErrors({ ...errors, [name]: e.target.validationMessage });
      }
    } else {
      setErrors({ ...errors, [name]: e.target.validationMessage });
    }
  }

  //ИЗМЕНЕНИЕ ИНПУТА ПОИСКОВОЙ СТРОКИ
  function handleChangeSearchInput(e) {
    setSearchFormValue(e.target.value);
  }

  //ИЗМЕНЕНИЕ ЧЕКБОКСА
  function handleChangeCheckbox(e) {
    if (isValidSearch) {
      setCheckbox(!checkbox);
      localStorage.setItem("filter-checkbox", !checkbox); // ВОЗМОЖНО !checkbox??????????????????????????????
      setIsValidSearch(false);
      setIsValid(e.target.closest("form").checkValidity());
      if (e.target.closest("form").checkValidity()) {
        setIsValidSearch(true);
        getMovies();
      } else {
        setIsValidSearch(false);
      }
    }
  }
  function handleChangeCheckboxSaved(e) {
    setCheckboxSaved(!checkboxSaved);
    setIsValidSearch(false);
    setIsValid(e.target.closest("form").checkValidity());
    if (e.target.closest("form").checkValidity()) {
      setIsValidSearch(true);
      getSavedMoviesFilter();
    } else {
      setIsValidSearch(false);
    }
  }

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

  React.useEffect(() => {
    if (location.pathname === "/movies") {
      if (localStorage.getItem("filter-request-text")) {
        setSearchFormValue(localStorage.getItem("filter-request-text"));
        setMovies(JSON.parse(localStorage.getItem("filter-movies")));
        setCheckbox(JSON.parse(localStorage.getItem("filter-checkbox")));
      } else {
        setSearchFormValue(""); // пробный вариат, вроде, работает, строка поиска пустая
      }
    } else if (location.pathname === "/saved-movies") {
      setSearchFormValue("");
      setSavedMoviesFilter(savedMovies);
      setCheckboxSaved(false);
      // setTimeout(() => console.log(savedMovies), 2000); // удали меня
    }
  }, [location]);

  //ПОЛУЧИТЬ В СОХРАНЕННЫЕ ФИЛЬМЫ
  async function getSavedMovies() {
    setIsLoading(true);
    try {
      const res = await mainApi.getSavedMovies();
      const data = await res;
      setSavedMovies(data);
      setSavedMoviesFilter(data);
      setTimeout(() => setArrSavedMovies(true), 500); // надо ли здесь????
    } catch (err) {
      console.error(
        `Что-то пошло не так при получении сохраненных карточек: ${err}`
      );
    }
    setTimeout(() => setIsLoading(false), 500); // надо ли здесь?
  }

  React.useEffect(() => {
    setInputChange({
      name: false,
      email: false,
    });
    if (loggedIn) {
      // if (!currentUser) {
      mainApi
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.error(`Данные пользователя не получены: ${err}`);
        });
      // }
      getSavedMovies(); // получить сохраненные фильмы
      if (location.pathname === "/movies") {
        setIsLoading(true);
        if (localStorage.getItem("filter-movies")) {
          setMovies(JSON.parse(localStorage.getItem("filter-movies")));
          setSearchFormValue(
            localStorage.getItem("filter-request-text", searchFormValue)
          );
          // setCheckbox(JSON.parse(localStorage.getItem("filter-checkbox"))); // НЕ ПОКАЗЫВАЕТ ПОЧЕМУ-ТО????
          setArrMovies(true);
          setTimeout(() => setIsLoading(false), 500);
        } else {
          setMovies([]);
          setArrMovies(true);
          setTimeout(() => setIsLoading(false), 500);
        }
      } else if (location.pathname === "/saved-movies") {
        setSavedMoviesFilter(savedMovies);
        setArrSavedMovies(true);
        setCheckboxSaved(false);
      }
    }
  }, [loggedIn]);

  // УДАЛИТЬ ТОКЕН, и все из хранилища, кроме массива карточек
  function handleLoggedInFalse() {
    localStorage.removeItem("jwt");
    // Пустой массив
    localStorage.removeItem("filter-movies");
    setArrMovies(false);
    setArrSavedMovies(false);
    // текст поисковой строки
    localStorage.removeItem("filter-request-text");
    setSearchFormValue("");
    //чекбокс
    localStorage.removeItem("filter-checkbox");
    setLoggedIn(false);
    localStorage.removeItem("movies");
    // setCurrentUser(null); ////////////////// НЕ ЗНАЮ, НАДО ЛИ ЭТО СЮДА ВСТАВЛЯТЬ???
    //ошибки
    setErrorTextSavedMovies(false);
    setErrorTextMovies(false);
    //смена страницы
    navigate("/");
  }

  //Сохранить данные формы в профиле(сабмит)
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

  // сделать инпуты открытыми для редактирования
  function handleDisabledInput() {
    setDisabledInput(false);
    setIsValid(false);
  }

  // САБМИТ profile
  function handleSubmitProfile(e) {
    e.preventDefault();
    setInputChange({
      name: false,
      email: false,
    });
    if (!formValue.name) {
      onUpdateUserInfo(currentUser.name, formValue.email);
      setDisabledInput(true);
    } else if (!formValue.email) {
      onUpdateUserInfo(formValue.name, currentUser.email);
      setDisabledInput(true);
    } else {
      onUpdateUserInfo(formValue.name, formValue.email);
      setDisabledInput(true);
    }
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
    if (loggedIn) {
      if (!localStorage.getItem("movies")) {
        setIsLoading(true);
        moviesApi
          .getAllMovies()
          .then((movies) => {
            localStorage.setItem("movies", JSON.stringify(movies));
            setTimeout(() => setIsLoading(false), 500);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }, [loggedIn]);

  //ФИЛЬТР
  // ФИЛЬМЫ
  function getMovies() {
    try {
      // setIsLoading(true); ////из-за этого не работает чекбокс на обычные фильмы!!!!!
      // setCheckbox(JSON.parse(localStorage.getItem("filter-checkbox")));
      let arrayMovies = JSON.parse(localStorage.getItem("movies"));
      // фильтрация поиска по названию
      const filterMovies = arrayMovies.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(searchFormValue.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchFormValue.toLowerCase())
      );
      // добавляем в хранилище
      function addToLocalStorage(filterChecboxMovies) {
        localStorage.setItem(
          "filter-movies",
          JSON.stringify(filterChecboxMovies)
        );
        localStorage.setItem("filter-request-text", searchFormValue);
        // localStorage.setItem("filter-checkbox", checkbox);
        //отражаем на странице
        if (filterMovies.length === 0) {
          setArrMovies(false);
          setMovies([]);
          setTimeout(() => setIsLoading(false), 500);
        } else {
          setMovies(JSON.parse(localStorage.getItem("filter-movies")));
          setButtonAddMovies(true);
          setArrMovies(true);
          setTimeout(() => setIsLoading(false), 500);
        }
      }

      // фильтрация поиска по времени
      if (checkbox) {
        let filterChecboxMovies = filterMovies.filter(
          (movie) => movie.duration < 40
        );
        addToLocalStorage(filterChecboxMovies);
      } else {
        let filterChecboxMovies = filterMovies;
        addToLocalStorage(filterChecboxMovies);
      }
    } catch (e) {
      setErrorTextMovies(true);
    }
  }

  //СОХРАНЕННЫЕ ФИЛЬМЫ setSavedMoviesFilter
  function getSavedMoviesFilter() {
    try {
      setIsLoading(true);
      // фильтрация поиска по названию
      const filterSavedMovies = savedMovies.filter(
        (sMovie) =>
          sMovie.nameRU.toLowerCase().includes(searchFormValue.toLowerCase()) ||
          sMovie.nameEN.toLowerCase().includes(searchFormValue.toLowerCase())
      );
      //отражаем на странице
      function addToLocalStorage(filterChecboxMovies) {
        if (filterChecboxMovies.length === 0) {
          setArrSavedMovies(false);
          setSavedMoviesFilter([]);
          setTimeout(() => setIsLoading(false), 500);
        } else {
          setSavedMoviesFilter(filterChecboxMovies);
          setArrSavedMovies(true);
          setTimeout(() => setIsLoading(false), 500);
        }
      }
      // фильтрация поиска по времени
      if (!checkboxSaved) {
        let filterChecboxMovies = filterSavedMovies.filter(
          (movie) => movie.duration < 40
        );
        addToLocalStorage(filterChecboxMovies);
      } else {
        let filterChecboxMovies = filterSavedMovies;
        addToLocalStorage(filterChecboxMovies);
      }
    } catch (e) {
      setErrorTextSavedMovies(true);
    }
  }

  //САБМИТ ФОРМЫ ПОИСКА
  function handleSubmitSearchForm(e) {
    e.preventDefault();
    if (e.target.checkValidity()) {
      setIsValidSearch(true);
      if (location.pathname === "/movies") {
        // setCheckbox(JSON.parse(localStorage.getItem("filter-checkbox"))); // ВСЕ РАВНО НЕ СМОТРИТ НА ЧЕКБОКС!!!!!!!
        getMovies();
      } else if (location.pathname === "/saved-movies") {
        getSavedMoviesFilter();
      }
    } else {
      setIsValidSearch(false);
    }
  }

  // ДЕЙСТВИЯ С ФИЛЬМАМИ
  //СОХРАНИТЬ ФИЛЬМ
  function handleSaveMovies(movie) {
    mainApi
      .addMovie(movie)
      .then((data) => {
        setSavedMovies([data, ...savedMovies]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //УДАЛИТЬ ФИЛЬМ
  function handleDeleteMovies(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((movies) =>
          movies.filter((savedMovie) => movie._id !== savedMovie._id)
        );
      })
      .then(() => {
        navigate("/saved-movies");
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
                      savedMoviesFilter={savedMoviesFilter}
                      handleSubmitSearchForm={handleSubmitSearchForm}
                      buttonAddMovies={buttonAddMovies}
                      setButtonAddMovies={setButtonAddMovies}
                      onSave={handleSaveMovies}
                      searchBar={searchFormValue}
                      handleChangeInput={handleChangeSearchInput}
                      arrMovies={arrMovies}
                      arrSavedMovies={arrSavedMovies}
                      onchecked={checkbox}
                      handleChangeCheckbox={handleChangeCheckbox}
                      errorTextMovies={errorTextMovies}
                      errorTextSavedMovies={errorTextSavedMovies}
                      onCheckedSaved={checkboxSaved}
                      handleChangeCheckboxSaved={handleChangeCheckboxSaved}
                      isValidSearch={isValidSearch}
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
                      savedMoviesFilter={savedMoviesFilter}
                      handleSubmitSearchForm={handleSubmitSearchForm}
                      buttonAddMovies={buttonAddMovies}
                      setButtonAddMovies={setButtonAddMovies}
                      onSave={handleSaveMovies}
                      searchBar={searchFormValue}
                      handleChangeInput={handleChangeSearchInput}
                      arrMovies={arrMovies}
                      arrSavedMovies={arrSavedMovies}
                      onchecked={checkbox}
                      handleChangeCheckbox={handleChangeCheckbox}
                      errorTextMovies={errorTextMovies}
                      errorTextSavedMovies={errorTextSavedMovies}
                      onCheckedSaved={checkboxSaved}
                      handleChangeCheckboxSaved={handleChangeCheckboxSaved}
                      isValidSearch={isValidSearch}
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
                      isValid={isValid}
                      errors={errors}
                      onSubmit={handleSubmitProfile}
                      handleChangeInput={handleChangeInput}
                      disabledInput={disabledInput}
                      handleDisabledInput={handleDisabledInput}
                      formValue={formValue}
                      inputChange={inputChange}
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
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <>
                    <Top text="Рады видеть!" />
                    <Login
                      handleChangeInput={handleChangeInput}
                      onSubmit={handleSubmitLogin}
                      email={formValue.email}
                      password={formValue.password}
                      isValid={isValid}
                      errors={errors}
                    />
                  </>
                )
              }
            />
            <Route
              path="/signup"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <>
                    <Top text="Добро пожаловать!" />
                    <Register
                      handleChangeInput={handleChangeInput}
                      onSubmit={handleSubmitRegister}
                      name={formValue.name}
                      email={formValue.email}
                      password={formValue.password}
                      isValid={isValid}
                      errors={errors}
                    />
                  </>
                )
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
