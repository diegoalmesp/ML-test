import React from 'react';

import './styles.css';

const Item = ({id}) => (
  <div className="row ML-details-container">
    <div className="row">
    	<div className="col-md-8">
    		<img src="https://placeholdit.co//i/680x680" alt="Imagen de producto" />
    		<h3>Descripción del producto</h3>
    		<p>{product.item.description}</p>
    	</div>
    	<div className="col-md-4">
    		<p>{product.item.condition} - {product.item.sold_quantity} vendidos</p>
    		<h4>{product.item.title}</h4>
    		<h1>{product.item.price.currency} {product.item.price.amount}</h1>
    	</div>
    </div>
  </div>
);

let product = {
  "author": {
    "name": "Nombre",
    "lastname": "Apellido"
  },
  "item": {
    "id": "123",
    "title": "Cámara Canon 60D",
    "price": {
      "currency": "$",
      "amount": 48000,
      "decimals": 2
    },
    "picture": "picture",
    "condition": "nuevo",
    "free_shipping": true,
    "sold_quantity": 2,
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis elementum purus, in congue lacus fringilla at. Sed congue venenatis orci non mattis. Donec laoreet odio ac lectus placerat, ac sagittis lacus congue. Phasellus varius justo eget est sollicitudin aliquam. Nullam non gravida nibh, vitae congue est. Curabitur tristique, nulla at auctor gravida, tellus nunc vestibulum metus, quis venenatis justo dolor eget ligula. Maecenas gravida et diam vel pretium."
  }
};

export default Item;
