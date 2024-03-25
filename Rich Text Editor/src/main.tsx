import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Editor from './components/Editor';
import Header from './components/Header';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header />
    <Editor />
  </React.StrictMode>,
)
