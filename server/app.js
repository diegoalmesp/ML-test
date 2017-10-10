const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('isomorphic-fetch');


const app = express();

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

		fetchProductsList(query, limit, URL);

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

function fetchProductsList(query, limit, URL) {
	// const URL = 'https://api.mercadolibre.com';
	// const limit = 4;

	let list = {};
	let categories = {};

	fetch(`${URL}/sites/MLA/search?q=${query}&limit=${limit}`)
			.then((response) => {
				if(response.status !== 200) {
					console.log(`ocurrió un problema. Status: ${response.status}`);
					return;
				}
				response.json().then((prod) => {
					//res.send(prod);
					list = prod;

					fetch(`${URL}/categories/${list.results[0].category_id}`)
						.then((response) => {
							if(response.status !== 200) {
								console.log(`ocurrió un problema. Status: ${response.status}`);
								return;
							}
							response.json().then((cat) => {
								//res.send(cat);
								categories = cat;

								createProductList(list, categories);

								// console.log(list);

								// console.log(categories);
							});
						});
				});
			});
}

function createProductList(list, categories) {
	let productsList = {};
	productsList.author = {}
	productsList.author.name = 'Diego';
	productsList.author.lastname = 'Almirón';

	let categoriesArray = [];

	categories.path_from_root.map((category) => {
		categoriesArray.push(category.name);
	});

	productsList.categories = categoriesArray;

	productsList.items = [];

	list.results.map((product) => {
		let item = {};
		item.id = product.id;
		item.title = product.title;
		item.price = {
			currency: product.currency_id,
			amount: product.price,
			decimals: 00
		}
		item.picture = product.thumbnail;
		item.condition = product.condition;
		item.free_shipping = product.shipping.free_shipping;

		productsList.items.push(item);
	});

	console.log(productsList);
}

function createSingleProduct(data) {}

module.exports = app;
