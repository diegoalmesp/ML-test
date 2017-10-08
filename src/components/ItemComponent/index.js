import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const ItemComponent = ({product}) => (
  <div className="row ML-product-container">
    <Link to={`/items/${product.id}`}>
      <section className="col-md-2 ML-product-thumb">
        <img src="https://placeholdit.co//i/180x180" alt="Imagen pequeña del producto" />
      </section>
      <section className="col-md-10 ML-product-specs">
        <div className="row">
          <div className="col-md-8">
            <p>{product.price.currency} {product.price.amount}</p>
            <p>{product.title}</p>
          </div>
          <div className="col-md-4">
            <p className="ML-product-state">Provincia</p>
          </div>
        </div>
      </section>
    </Link>
  </div>
);

export default ItemComponent;
