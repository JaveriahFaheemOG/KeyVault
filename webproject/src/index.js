import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './css-files/homepage.css';

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Montserrat', 'Roboto', 'Open Sans', 'Lato', 'Oswald', 'Raleway', 'Poppins', 'Nunito', 'Source Sans Pro', 'Roboto Slab','Quicksand','Libre Baskerville','Playfair Display', 'Source Sans Pro', 'Ubuntu', 'Ultra', 'Slabo 27px', 'Nunito','Crimson Text','Hind']
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
