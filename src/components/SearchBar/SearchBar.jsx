import React from 'react';

export const Searchbar = ({ onSubmit, formRef }) => {
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmit} ref={formRef}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
        <input
          name="query"
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
