
function cors(req, res, next) {

	const origin = req.headers.origin;

	res.setHeader('Access-Control-Allow-Origin', origin || '*');
	res.setHeader('Access-Control-Allow-Methods', 
		'POST, GET, PUT, DELETE, OPTIONS, XMODIFY');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Max-Age', '864000');
	res.setHeader('Access-Control-Allow-Headers', 
		'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');	

	next();
}

function handleError(err, req, res, next) {
	console.error(err);
	if (res.headerSent)
		return next(err);
	//TODO: check error message for DEBUG and PRODUCTION
	res.status(500).json(err);
	//res.status(500).json({ error: 'Internal Error' });
}


function notFound(req, res) {
	res.status(404).json({ error: 'Not Found' });
}

module.exports = {
	cors,
	handleError,
	notFound
};