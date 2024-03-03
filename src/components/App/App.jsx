//React
import React from "react";
import { Routes, Route /*, Navigate , useNavigate*/ } from "react-router-dom";

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
//прочее
// МАССИВ КАРТОЧЕК
// карточки как массив спускаются пропсом в конкретные компоненты и отрисовываются
// при изменении состава массива (добавили лайкнутую карточку/удалили карточку) нужно пересобрать массив и обновить стейт
// - когда стейт обновится он так же отправится "вниз" по дереву компонентов и будет отрисован

function App() {
  // функциональность вся:
  const [loggedIn, setLoggedIn] = React.useState(true); // false
  const [isLoading, setIsLoading] = React.useState(false); // false
  const [readonly, setReadonly] = React.useState(false); // true
  const [savedMovies, setSavedMovies] = React.useState(true); // false
  const [pageSavedMovies, setPageSavedMovies] = React.useState(false); // false
  
  return (
    <div className="app">
      {/*<CurrentUserContext.Provider value={currentUser}>*/}
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Movies isLoading={isLoading} savedMovies={savedMovies} />
                <Footer />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <SavedMovies savedMovies={savedMovies} pageSavedMovies={pageSavedMovies} />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Profile loggedIn={loggedIn} readonly={readonly} />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <Top text="Рады видеть!" />
                <Login />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Top text="Добро пожаловать!" />
                <Register />
              </>
            }
          />
          {/*replace возвращает новую строку с некоторыми или всеми сопоставлениями с шаблоном, заменёнными на заменитель*/}
          <Route path="*" element={<OtherPages />} />
        </Routes>
        <PopupMenu />
      </div>
      {/*</CurrentUserContext.Provider>*/}
    </div>
  );
}

export default App;
