// SearchForm — форма поиска, куда пользователь будет вводить запрос.
import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({
  handleSubmitSearchForm,
  searchBar,
  handleChangeInput,
  onChecked,
  handleChangeCheckbox,
  onCheckedSaved,
  handleChangeCheckboxSaved
}) {
  return (
    <section className="search-form">
      <form
        name="formSearch"
        className="search-form__form"
        onSubmit={handleSubmitSearchForm}
      >
        <div className="search-form__box">
          <input
            className="search-form__input"
            required
            placeholder="Фильм"
            minLength="1"
            name="film"
            value={searchBar}
            onChange={handleChangeInput}
          />
          <button className="search-form__button" type="submit" />
        </div>
        <FilterCheckbox
          onChecked={onChecked}
          handleChangeCheckbox={handleChangeCheckbox}
          onCheckedSaved={onCheckedSaved}
          handleChangeCheckboxSaved={handleChangeCheckboxSaved}
        />
      </form>
    </section>
  );
}
