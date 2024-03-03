// Movies — компонент страницы с поиском по фильмам. В нём пригодятся эти компоненты:

import React from "react";
// import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies({ isLoading, savedMovies }) {
  return (
    <main className="movies">
      {!isLoading ? (
        <>
          <SearchForm />
          <MoviesCardList savedMovies={savedMovies}/>
        </>
      ) : (
        <Preloader />
      )}
    </main>
  );
}
