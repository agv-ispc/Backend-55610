import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import UserProfilePage from './pages/UserProfilePage';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/products" component={ProductsPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/profile" component={UserProfilePage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

