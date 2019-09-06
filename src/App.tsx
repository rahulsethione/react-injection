import React from 'react';
import './App.css';
import { Products } from './components/Products';
import { ShoppingCart } from './components/ShoppingCart';

export class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 products">
            <Products />
          </div>
          <div className="col-md-4 cart">
            <ShoppingCart />
          </div>
        </div>
      </div>
    );
  }
}
