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
  savedMoviesFilter,
  handleSubmitSearchForm,
  buttonAddMovies,
  setButtonAddMovies,
  onSave,
  searchBar,
  handleChangeInput,
  arrMovies,
  arrSavedMovies,
  onChecked,
  handleChangeCheckbox,
  errorTextMovies,
  errorTextSavedMovies,
  onCheckedSaved,
  handleChangeCheckboxSaved,
  isValidSearch,
}) {
  
  return (
    <div className="savedMovies">
      {!isLoading ? (
        <>
          <SearchForm
            handleSubmitSearchForm={handleSubmitSearchForm}
            searchBar={searchBar}
            handleChangeInput={handleChangeInput}
            onChecked={onChecked}
            handleChangeCheckbox={handleChangeCheckbox}
            onCheckedSaved={onCheckedSaved}
            handleChangeCheckboxSaved={handleChangeCheckboxSaved}
            isValidSearch={isValidSearch}
          />
          <MoviesCardList
            onDelete={onDelete}
            movieList={movieList}
            savedMovieList={savedMovieList}
            savedMoviesFilter={savedMoviesFilter}
            buttonAddMovies={buttonAddMovies}
            setButtonAddMovies={setButtonAddMovies}
            onSave={onSave}
            arrMovies={arrMovies}
            arrSavedMovies={arrSavedMovies}
            errorTextMovies={errorTextMovies}
            errorTextSavedMovies={errorTextSavedMovies}
          />
        </>
      ) : (
        <Preloader />
      )}
    </div>
  );
}
