const cuid = require('cuid');
const { isEmail } = require('validator');

const db = require('../db');


function emailSchema(opts = {}) {

	const { required } = opts;

	return {
		type: String,
		required: !!required,
		validate: {
			validator: isEmail,
			message: props => `${props.value} is not a valid Email`
		}
	};
}


const Order = db.model('Order', {
	_id: { type: String, default: cuid },
	buyerEmail: emailSchema({ required: true }),
	products: [
		{
			type: String,
			ref: 'Product',
			index: true,
			required: true
		}
	],
	status: {
		type: String,
		index: true,
		default: 'CREATED',
		enum: [ 'CREATED', 'PENDING', 'COMPLETED' ]
	}	
});



async function create(fields) { 
	const product = await new Order(fields).save();
	return product;
}

async function get(_id) {
	const order = await Order.findById(_id)
		.populate('products')
		.exec();

	return order;
}

async function list(opts = {}) {
	
	const { offset = 0, limit = 25, productId, status } = opts;

	const query = {};
	if (productId) 
		query._id = productId;
	if (status)
		query.status = status;

	const orders = await Order.find(query)
		.sort({ _id: 1 })
		.skip(offset)
		.limit(limit);

	return orders;
}

async function edit(_id, change) {

	const order = await get({ _id });
	Object.keys(change).forEach(function(key) {
		order[key] = change[key];
	});

	await order.save();
	return order;
}


async function remove(_id) {

	await Order.deleteOne({ _id });
}


module.exports = {
	create,
	get,
	list,
	edit, 
	remove
};