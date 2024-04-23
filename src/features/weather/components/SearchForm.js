import React from 'react';

function SearchForm({ city, setCity, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input type="text" className="form-control" value={city} onChange={e => setCity(e.target.value)} placeholder="Введите город" />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="submit">Получить погоду</button>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
