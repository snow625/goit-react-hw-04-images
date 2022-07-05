import { useState, memo } from "react";
import PropTypes from "prop-types";

import style from "./searchbar.module.css";

const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

 
  return (
    <header className={style.searchbar}>
      <form className={style.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={style.searchFormButton}>
          <span className={style.label}>Search</span>
        </button>

        <input
          onChange={handleChange}
          className={style.input}
          value={inputValue}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default memo(Searchbar);
