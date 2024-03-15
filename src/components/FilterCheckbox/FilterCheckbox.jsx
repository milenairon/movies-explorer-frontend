// Переключение "корометражки"
import React from "react";
import "./FilterCheckbox.css";
import { useLocation } from "react-router-dom";

export default function FilterCheckbox({
  
  handleChangeCheckbox,
  onCheckedSaved,
  handleChangeCheckboxSaved,
}) {
  const location = useLocation();
  return (
    <div className="filter-checkbox">
      {location.pathname === "/movies" && (
        <input
          type="checkbox"
          onChange={handleChangeCheckbox}
          defaultChecked={localStorage.getItem("filter-checkbox")}
        />
      )}
      {location.pathname === "/saved-movies" && (
        <input
          type="checkbox"
          value={onCheckedSaved}
          checked={onCheckedSaved}
          onChange={handleChangeCheckboxSaved}
        />
      )}
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}
