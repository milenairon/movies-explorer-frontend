// SavedMovies — компонент страницы с сохранёнными карточками фильмов. Компоненты:

import React from "react";
// import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies({ savedMovies, pageSavedMovies, movies }) {
  return (
    <div className="savedMovies">
      <SearchForm />
      <MoviesCardList
        savedMovies={savedMovies}
        pageSavedMovies={pageSavedMovies}
        movies={movies}
      />
    </div>
  );
}
