import React from 'react';

function ErrorMessage({ error }) {
  return <div className="alert alert-danger">Ошибка: {error}</div>;
}

export default ErrorMessage;