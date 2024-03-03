// компонент одной карточки фильма

import React from "react";
import "./MoviesCard.css";
import image from "../../images/image1.png";
import imageSavedMovies from "../../images/movies-card__image-saved-movies.svg";
import imageDeleteMovies from "../../images/movies-card__button-delete.svg"

export default function MoviesCard({
  savedMovies,
  pageSavedMovies,
  onDeleteMovies,
}) {
  return (
    <li className="movies-card">
      <img className="movies-card__image" src={image} alt="бла бла бла" />
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
        <p className="movies-card__name">33 слова о дизайне</p>
        <p className="movies-card__time">1ч 17м</p>
      </div>
    </li>
  );
}
