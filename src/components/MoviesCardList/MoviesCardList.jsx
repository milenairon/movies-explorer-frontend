// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.

import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({savedMovies, pageSavedMovies}) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__items">
        <MoviesCard savedMovies={savedMovies} pageSavedMovies={pageSavedMovies}/>
        <MoviesCard savedMovies={savedMovies} pageSavedMovies={pageSavedMovies}/>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button className="movies-card-list__button">Ещё</button>
    </section>
  );
}
