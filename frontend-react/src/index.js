import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './Router';
import './assets/css/index.css'
import './assets/css/button.css'
import {
  RouterProvider
} from 'react-router-dom'




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <RouterProvider router={router} />
);

