// Movies — компонент страницы с поиском по фильмам. В нём пригодятся эти компоненты:

import React from "react";
// import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies({
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
  handleChangeCheckboxSaved
}) {
  return (
    <main className="movies">
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
    </main>
  );
}
