const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('isomorphic-fetch');


const app = express();

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.get('/api/items/:id?', (req, res) => {
	const query = req.query.q;
	const prodID = req.params.id;
	const URL = 'https://api.mercadolibre.com';
	const limit = 4;

	if(query !== undefined) {
		fetch(`${URL}/sites/MLA/search?q=${query}&limit=${limit}`)
			.then((response) => {
				if(response.status !== 200) {
					console.log(`ocurrió un problema. Status: ${response.status}`);
					return;
				}
				response.json().then((data) => {
					res.send(data);
					return;
				});
			});

	} else if(prodID !== undefined) {

		let product = {},
				description = '';

		fetch(`${URL}/items/${prodID}`)
			.then((response) => {
				if(response.status !== 200) {
					console.log(`ocurrió un problema. Status: ${response.status}`);
					return;
				}
				response.json().then((data) => {
					product = data;

					fetch(`${URL}/items/${prodID}/description`)
						.then((response) => {
							if(response.status !== 200) {
								console.log(`ocurrió un problema. Status: ${response.status}`);
								return;
							}
							response.json().then((data) => {
								product.description = data.text;

								res.send(product);
							});
						});
				});
			});
	}

	
});

function fetchSearch(query) {}

function fetchProduct(query) {}

function createProductsList(data) {}

module.exports = app;