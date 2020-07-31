const db = require('../db');
const Products = require('../models/products');

const products = require('./products.json');



(async function () {
	
	for (var i = 0; i < products.length; i++) {
		console.log(await Products.create(products[i]));
	}

	db.disconnect();
})();


/*
async function load() {
	
	await products.forEach(async product => {
		//try {
			console.log(await Products.create(product));
		//}
		//catch (err) {
		//	console.dir(err);
		//}
	});

	db.disconnect();
};

load();
*/

