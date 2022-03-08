import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Session } from './Session';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home />}></Route>
        <Route path=":sid" element={<Session />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
