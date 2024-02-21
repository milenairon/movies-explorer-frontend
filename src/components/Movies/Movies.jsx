// Movies — компонент страницы с поиском по фильмам. В нём пригодятся эти компоненты:
// SearchForm
// Preloader
// MoviesCardList
// MoviesCard

import React from "react";
import "./Movies.css";
// import { NavLink } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function Movies({ loggedIn }) {
  return (
    <div className="movies">
      <SearchForm />
      <Preloader />
      <MoviesCardList />
      <MoviesCard />
    </div>
  );
}