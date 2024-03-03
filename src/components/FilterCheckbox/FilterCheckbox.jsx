// Переключение "корометражки"
import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <input type="checkbox" />
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}
