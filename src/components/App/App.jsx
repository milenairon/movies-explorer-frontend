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
//попапы
//Запросы
//прочее

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  // функциональность вся
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
                <Movies />
                <Footer />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <SavedMovies />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header loggedIn={loggedIn} />
              </>
            }
          />
          <Route path="/signin" element={<></>} />
          <Route path="/signup" element={<></>} />
          {/*replace возвращает новую строку с некоторыми или всеми сопоставлениями с шаблоном, заменёнными на заменитель*/}
          <Route path="*" element={<></> /*404 страница по макету */} />
        </Routes>
      </div>
      {/*</CurrentUserContext.Provider>*/}
    </div>
  );
}

export default App;
