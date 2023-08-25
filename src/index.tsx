import React from 'react';
import ReactDOM from 'react-dom/client';
import QuestionnaireApp from "./QuestionnaireApp";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QuestionnaireApp />
  </React.StrictMode>
);

