// компонент одной карточки фильма

import React from "react";
import "./MoviesCard.css";
import imageSavedMovies from "../../images/movies-card__image-saved-movies.svg";
import imageDeleteMovies from "../../images/movies-card__button-delete.svg";
import { NavLink, useLocation } from "react-router-dom";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function MoviesCard({
  onDelete,
  thumbnail,
  name,
  time,
  trailerLink,
  onSave,
  movie,
  savedMovieList,
}) {
  //Время на карточке с фильмом
  let hours = Math.floor(time / 60);
  let minutes = Math.floor(time - hours * 60);
  // открытая страница
  const location = useLocation();
  // Сохранен ли фильм
  const onSaved = savedMovieList.some(
    (savedMovie) => savedMovie.movieId === movie.id
  );

  // Сохранить фильм
  function handleSaveMovies() {
    onSave(movie);
  }

  // Удалить фильм
  function handleDeleteMovies() {
    onDelete(movie);
  }

  return (
    <li className="movies-card">
      <NavLink
        to={trailerLink}
        className="movies-card__trailer-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="movies-card__image" src={thumbnail} alt={name} />
      </NavLink>
      {location.pathname === "/saved-movies" && (
        <>
          <button
            type="button"
            className="movies-card__button-delete"
            onClick={handleDeleteMovies}
          >
            <img
              className="movies-card__image-delete"
              src={imageDeleteMovies}
              alt="Удалить фильм из сохраненных"
            />
          </button>
        </>
      )}
      {location.pathname === "/movies" && (
        <>
          {onSaved ? (
            <button
              type="button"
              className="movies-card__button-delete-movies"
              onClick={handleDeleteMovies}
            >
              <img
                className="movies-card__image-saved-movies"
                src={imageSavedMovies}
                alt="Фильм добавлен в сохраненные, удалить фильм из сохраненных"
              />
            </button>
          ) : (
            <>
              <button
                aria-label="Добавить в сохраненные фильмы"
                className="movies-card__button-unsave"
                type="button"
                onClick={handleSaveMovies}
              >
                Сохранить
              </button>
            </>
          )}
        </>
      )}

      <div className="movies-card__box">
        <h2 className="movies-card__name">{name}</h2>
        <p className="movies-card__time">
          {hours}ч {minutes}м
        </p>
      </div>
    </li>
  );
}
