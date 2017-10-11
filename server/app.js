const express = require('express');
const morgan = require('morgan');
const path = require('path');

require('isomorphic-fetch');

const {
	fetchListOfProducts,
	fetchCategories,
	fetchFirstProductImage,
	fetchSingleProduct,
	fetchProductDescription } = require('./fetchData');


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

		let productsFetched = fetchListOfProducts(query);

		productsFetched.then(prods => {
			let singleProductsAndCategories = [];

			prods.results.map(prod => {
				singleProductsAndCategories.push(fetchFirstProductImage(prod.id));
			});
			singleProductsAndCategories.push(fetchCategories(prods));

			Promise.all(singleProductsAndCategories).then(result => {
				let finalList = createProductList(prods, result);

				res.send(finalList);

			}).catch(reason => {
				console.error(reason);
			});
		});

	} else if(prodID !== undefined) {

		let product = {},
				description = '';

		product = fetchSingleProduct(prodID);
		product.then(prod => {
			description = fetchProductDescription(prodID);

			description.then(descr => {
				let finalProduct = createSingleProduct(prod, descr);

				res.send(finalProduct);
			});
		});
	}

	
});

/**
 * crear las listas de productos para 
 * ser enviados a la app de react js
 *
 */
function createProductList(list, singleProdAndCategories) {
	let productsList = {};
	productsList.author = {}
	productsList.author.name = 'Diego';
	productsList.author.lastname = 'Almirón';

	let categoriesArray = [];

	singleProdAndCategories[singleProdAndCategories.length - 1].path_from_root.map((category) => {
		categoriesArray.push(category.name);
	});

	productsList.categories = categoriesArray;

	productsList.items = [];

	list.results.map((product, index) => {
		let item = {};
		item.id = product.id;
		item.title = product.title;
		item.price = {
			currency: product.currency_id,
			amount: product.price,
			decimals: 00
		}
		item.picture = singleProdAndCategories[index].pictures[0].url;
		item.condition = product.condition;
		item.free_shipping = product.shipping.free_shipping;
		item.address = product.address.state_name;

		productsList.items.push(item);
	});

	return productsList;
}

function createSingleProduct(prod, desc) {
	let newProd = {};
	newProd.author = {}
	newProd.author.name = 'Diego';
	newProd.author.lastname = 'Almirón';

	newProd.item = {};
	newProd.id = prod.id;
	newProd.title = prod.title;
	newProd.price = {
		currency: prod.currency_id,
		amount: prod.price,
		decimals: 00
	};
	newProd.picture = prod.pictures[0].url;
	newProd.condition = prod.condition;
	newProd.free_shipping = prod.shipping.free_shipping;
	newProd.sold_quantity = prod.sold_quantity;
	newProd.description = desc.text;

	return newProd;
}

module.exports = app;
