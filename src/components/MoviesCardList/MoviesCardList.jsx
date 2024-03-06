// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.

import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  savedMovies,
  pageSavedMovies,
  movies,
}) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__items">
        {movies.map((movie) => {
          return (
            <MoviesCard
              savedMovies={savedMovies}
              pageSavedMovies={pageSavedMovies}
              key={movie.id}
                  name={movie.nameRU}
                  duration={movie.duration}
                  trailerLink={movie.trailerLink}
                  thumbnail={`https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`}
                  // savedMovies={savedMovies}
                  // onSave={onSave}
                  // onDelete={onDelete}
                  movie={movie}
            />
          );
        })}
      </ul>
      <button className="movies-card-list__button">Ещё</button>
    </section>
  );
}
