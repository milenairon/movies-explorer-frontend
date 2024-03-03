// SavedMovies — компонент страницы с сохранёнными карточками фильмов. Компоненты:

import React from "react";
// import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function SavedMovies({ savedMovies, pageSavedMovies }) {
  return (
    <div className="savedMovies">
      <MoviesCardList
        savedMovies={savedMovies}
        pageSavedMovies={pageSavedMovies}
      />
    </div>
  );
}
