// Movies — компонент страницы с поиском по фильмам. В нём пригодятся эти компоненты:

import React from "react";
// import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies({
  isLoading,
  savedMovies,
  movieList,
  handleSubmitSearchForm,
  buttonAddMovies,
  setButtonAddMovies,
}) {
  return (
    <main className="movies">
      {!isLoading ? (
        <>
          <SearchForm handleSubmitSearchForm={handleSubmitSearchForm} />
          <MoviesCardList
            savedMovies={savedMovies}
            movieList={movieList}
            buttonAddMovies={buttonAddMovies}
            setButtonAddMovies={setButtonAddMovies}
          />
        </>
      ) : (
        <Preloader />
      )}
    </main>
  );
}
