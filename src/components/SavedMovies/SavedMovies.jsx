// SavedMovies — компонент страницы с сохранёнными карточками фильмов. Компоненты:

import React from "react";
// import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

export default function SavedMovies({
  isLoading,
  onDelete,
  movieList,
  savedMovieList,
  handleSubmitSearchForm,
  buttonAddMovies,
  setButtonAddMovies,
  onSave,
}) {
  return (
    <div className="savedMovies">
      {!isLoading ? (
        <>
          <SearchForm handleSubmitSearchForm={handleSubmitSearchForm} />
          <MoviesCardList
            onDelete={onDelete}
            movieList={movieList}
            savedMovieList={savedMovieList}
            buttonAddMovies={buttonAddMovies}
            setButtonAddMovies={setButtonAddMovies}
            onSave={onSave}
          />
        </>
      ) : (
        <Preloader />
      )}
    </div>
  );
}
