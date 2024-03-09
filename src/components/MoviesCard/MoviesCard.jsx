// компонент одной карточки фильма

import React from "react";
import "./MoviesCard.css";
import imageSavedMovies from "../../images/movies-card__image-saved-movies.svg";
import imageDeleteMovies from "../../images/movies-card__button-delete.svg";
import { NavLink } from "react-router-dom";

export default function MoviesCard({
  savedMovies,
  pageSavedMovies,
  onDeleteMovies,
  link,
  name,
  time,
  trailerLink,
}) {
  let hours = Math.floor(time / 60);
  let minutes = Math.floor(time - hours * 60);

  return (
    <li className="movies-card">
      <NavLink
        to={trailerLink}
        className="movies-card__trailer-link"
        target="_blank"
        rel="noopener noreferrer"
      >
      <img className="movies-card__image" src={link} alt={name} />
      </NavLink>
      {savedMovies ? (
        pageSavedMovies ? (
          <>
            <button
              type="button"
              className="movies-card__button-delete"
              onClick={onDeleteMovies}
            >
              <img
                className="movies-card__image-delete"
                src={imageDeleteMovies}
                alt="Удалить фильм из сохраненных"
              />
            </button>
          </>
        ) : (
          <>
            <img
              className="movies-card__image-saved-movies"
              src={imageSavedMovies}
              alt="Фильм добавлен в сохраненные"
            />
          </>
        )
      ) : (
        <>
          <button
            aria-label="Добавить в сохраненные фильмы"
            className="movies-card__button-unsave"
            type="button"
          >
            Сохранить
          </button>
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
