import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Weather from './features/weather/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';

import './i18n';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1></h1>
        <Weather />
      </div>
    </Provider>
  );
}

export default App;
