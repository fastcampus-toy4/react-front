import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* App을 BrowserRouter로 감싸줍니다 */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();