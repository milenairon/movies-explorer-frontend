// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.

import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import arrMovies from "../../utils/utils";

export default function MoviesCardList({ savedMovies, pageSavedMovies }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__items">
        {arrMovies.map((movie) => (
          <MoviesCard
            savedMovies={savedMovies}
            pageSavedMovies={pageSavedMovies}
            key={movie.id}
            link={movie.link}
            name={movie.name}
            time={movie.time}
          />
        ))}
      </ul>
      <button className="movies-card-list__button">Ещё</button>
    </section>
  );
}
