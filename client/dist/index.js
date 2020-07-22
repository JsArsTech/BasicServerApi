var _jsxFileName = "client/src/index.js",
    _this = this;

var API_URL = "https://api.unsplash.com/photos/random?client_id=drU4-qjUFXQeDawLcnonGPaYEQvKDdcDjSdN6i5g1rw&count=25&count=25";

fetch(API_URL).then(function (response) {
	return response.json();
}).then(function (data) {

	var urls = data.map(function (d) {
		return d.urls.small;
	});

	ReactDOM.render(React.createElement(Gallery, { imageUrls: urls, __source: {
			fileName: _jsxFileName,
			lineNumber: 9
		},
		__self: _this
	}), document.getElementById('app'));
}).catch(function (err) {
	ReactDOM.render(React.createElement(
		"p",
		{
			__source: {
				fileName: _jsxFileName,
				lineNumber: 12
			},
			__self: _this
		},
		"Error"
	));
});