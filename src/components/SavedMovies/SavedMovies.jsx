// SavedMovies — компонент страницы с сохранёнными карточками фильмов. Компоненты:
// MoviesCardList
// MoviesCard

import React from "react";
import "./SavedMovies.css";
// import { NavLink } from "react-router-dom";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function SavedMovies ({ loggedIn }) {
  return (
    <div className="savedMovies">
      <MoviesCardList />
      <MoviesCard />
    </div>
  );
}
