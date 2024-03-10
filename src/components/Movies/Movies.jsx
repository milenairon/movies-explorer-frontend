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
  handleSubmitSearchForm,
  buttonAddMovies,
  setButtonAddMovies,
  onSave,
  setOnSavedMovie,
  getOnSavedMovie,
}) {
  return (
    <main className="movies">
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
            setOnSavedMovie={setOnSavedMovie}
            getOnSavedMovie={getOnSavedMovie}
          />
        </>
      ) : (
        <Preloader />
      )}
    </main>
  );
}
