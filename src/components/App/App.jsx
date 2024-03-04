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
// import api from "../../utils/Api"
import * as auth from "../../utils/auth";
//прочее
// МАССИВ КАРТОЧЕК
// карточки как массив спускаются пропсом в конкретные компоненты и отрисовываются
// при изменении состава массива (добавили лайкнутую карточку/удалили карточку) нужно пересобрать массив и обновить стейт
// - когда стейт обновится он так же отправится "вниз" по дереву компонентов и будет отрисован

function App() {
  // функциональность вся:
  const [loggedIn, setLoggedIn] = React.useState(true); // false
  const [isLoading, setIsLoading] = React.useState(false); // false
  const [readonly, setReadonly] = React.useState(true); // true
  const [savedMovies, setSavedMovies] = React.useState(true); // false
  const [pageSavedMovies, setPageSavedMovies] = React.useState(false); // false
  const [isPopupMenuOpen, setIsPopupMenuOpen] = React.useState(false);
  const isSomePopupOpen = isPopupMenuOpen; // + "|| другой попап || еще другой попап"
  const navigate = useNavigate();

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

  //ИЗМЕНЕНИЕ ИНПУТОВ
  const [formValue, setFormValue] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  //РЕГИСТРАЦИЯ
  function handleSubmitRegister(e) {
    e.preventDefault();
    auth
      .register(formValue.name, formValue.email, formValue.password)
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="app">
      {/*<CurrentUserContext.Provider value={currentUser}>*/}
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
                <Movies isLoading={isLoading} savedMovies={savedMovies} />
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
                <Profile loggedIn={loggedIn} readonly={readonly} />
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
      {/*</CurrentUserContext.Provider>*/}
    </div>
  );
}

export default App;
