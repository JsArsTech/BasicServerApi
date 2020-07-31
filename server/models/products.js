const cuid = require('cuid');
const db = require('../db');
const { isURL } = require('validator');


function urlSchema(opts = {}) {

	const { required } = opts;

	return {
		type: String,
		required: !!required,
		validate: {
			validator: isURL,
			message: props => `${props.value} is not a valid URL`

		}
	};
}


const Product = db.model('Product', {

	_id: { type: String, default: cuid },
	description: { type: String, required: true },
	imgThumb: urlSchema({ require: true }),
	img: urlSchema({ require: true }),
	link: urlSchema(),
	userId: { type: String, required: true },
	userName: { type: String, required: true },
	userLink: urlSchema(),
	tags: { type: [String], index: true }
});


async function create(fields) { 
	const product = await new Product(fields).save();
	return product;
}

async function get(_id) {

	const product = await Product.findById(_id);
	return product;
}

async function list(opts = {}) {
	
	const { offset = 0, limit = 25, tag } = opts;

	const query = tag ? { tags: tag } : {};

	const products = await Product.find(query)
		.sort({ _id: 1 })
		.skip(offset)
		.limit(limit);

	return products;
}


async function edit(_id, change) {

	const product = await get({ _id });
	Object.keys(change).forEach(function(key) {
		product[key] = change[key];
	});

	await product.save();
	return product;
}


async function remove(_id) {

	await Product.deleteOne({ _id });
}

module.exports = {
	create,
	list,
	get,
	edit,
	remove
};
