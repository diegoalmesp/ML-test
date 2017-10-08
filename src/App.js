import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import SearchBar from './components/SearchBar';

import Home from './components/Home';
import ItemsList from './components/ItemsList';
import Item from './components/Item';

const App = () => (
  <Router>
    <div>
      <header>
        <SearchBar />
      </header>
      <section className="container ML-container">
        <p className="ML-breadcrubs">Categoría 1 > Categoría 2 > Categoría 3 > <span>Categoría 4</span></p>

        <Route exact path="/" component={ Home } />
        <Route exact path="/items" component={ ItemsList } />
        <Route path="/items/:id" component={ Item } />
      </section>
    </div>
  </Router>
);

export default App;
