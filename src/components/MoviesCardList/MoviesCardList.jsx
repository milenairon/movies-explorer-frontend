// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.

import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

export default function MoviesCardList({
  onDelete,
  movieList,
  savedMovieList,
  savedMoviesFilter,
  buttonAddMovies,
  setButtonAddMovies,
  onSave,
  arrMovies,
  arrSavedMovies,
  errorTextMovies,
  errorTextSavedMovies,
}) {
  //количество показанных видео
  const [sumMovies, setSumMovies] = React.useState(0);
  // Ширина экрана
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  // Смена страницы
  const location = useLocation();
  //количество добавленных видео
  const [addedMovies, setAddedMovies] = React.useState(0);

  // КОЛИЧЕСТВО ВИДЕО
  React.useEffect(() => {
    const handleResizeWindow = () => setWindowWidth(window.innerWidth);
    if (windowWidth > 768) {
      //1280px
      let columMovies = 3;
      let rowsMovies = 4;
      setAddedMovies(3);
      setSumMovies(columMovies * rowsMovies);
    } else if (windowWidth > 480) {
      //768
      let columMovies = 2;
      let rowsMovies = 4;
      setAddedMovies(2);
      setSumMovies(columMovies * rowsMovies);
    } else if (windowWidth <= 480) {
      //320px
      let columMovies = 1;
      let rowsMovies = 5;
      setAddedMovies(2);
      setSumMovies(columMovies * rowsMovies);
    }
    console.log();
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, [location, windowWidth]);

  // добавить видео при нажатии на кнопку
  function addMovies() {
    setSumMovies(sumMovies + addedMovies);
  }

  // Убрать кнопку "Еще" если выложены уже все видео на странице
  React.useEffect(() => {
    if (sumMovies >= movieList.length) {
      setButtonAddMovies(false);
    } else {
      setButtonAddMovies(true);
    }
  }, [addMovies]);

  return (
    <section className="movies-card-list">
      {location.pathname === "/movies" && (
        <>
          {!arrMovies ? (
            <>
              {errorTextMovies ? (
                <p className="movies-card-list__title">
                  Во время запроса произошла ошибка. Возможно, проблема с
                  соединением или сервер недоступен. Подождите немного и
                  попробуйте ещё раз
                </p>
              ) : (
                <h2 className="movies-card-list__title">Ничего не найдено</h2>
              )}
            </>
          ) : (
            <>
              <ul className="movies-card-list__items">
                {movieList.slice(0, sumMovies).map((movie) => {
                  return (
                    <MoviesCard
                      movie={movie}
                      onDelete={onDelete}
                      key={movie.id}
                      name={movie.nameRU}
                      thumbnail={`https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`}
                      time={movie.duration}
                      trailerLink={movie.trailerLink}
                      onSave={onSave}
                      savedMovieList={savedMovieList}
                    />
                  );
                })}
              </ul>
            </>
          )}
        </>
      )}
      {location.pathname === "/saved-movies" && (
        <>
          {!arrSavedMovies ? (
            <>
              {errorTextSavedMovies ? (
                <p className="movies-card-list__title">
                  Во время запроса произошла ошибка. Возможно, проблема с
                  соединением или сервер недоступен. Подождите немного и
                  попробуйте ещё раз
                </p>
              ) : (
                <h2 className="movies-card-list__title">Ничего не найдено</h2>
              )}
            </>
          ) : (
            <>
              <ul className="movies-card-list__items">
                {savedMoviesFilter.slice(0, sumMovies).map((movie) => {
                  return (
                    <MoviesCard
                      movie={movie}
                      onDelete={onDelete}
                      key={movie._id}
                      name={movie.nameRU}
                      thumbnail={movie.thumbnail}
                      time={movie.duration}
                      trailerLink={movie.trailerLink}
                      onSave={onSave}
                      savedMovieList={savedMovieList}
                    />
                  );
                })}
              </ul>
            </>
          )}
        </>
      )}

      {buttonAddMovies && location.pathname === "/movies" && (
        <button className="movies-card-list__button" onClick={addMovies}>
          Ещё
        </button>
      )}
    </section>
  );
}
