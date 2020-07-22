function catchWrapper(func) {

	return async function(req, res, next) {
		try {
			await func(req, res, next);
		}
		catch (err) {
			next(err);
		}
	}
}

function autoCatch(inFuncs) {

	let outFuncs = {}; 

	Object.keys(inFuncs)
		.forEach( key => outFuncs[key] = catchWrapper(inFuncs[key]) );

	return outFuncs;
}


module.exports = autoCatch;
