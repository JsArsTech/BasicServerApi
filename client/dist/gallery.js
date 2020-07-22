var _jsxFileName = "client/src/gallery.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
*/
//https://www.javascriptstuff.com/react-image-gallery/

var Gallery = function (_React$Component) {
	_inherits(Gallery, _React$Component);

	function Gallery(props) {
		_classCallCheck(this, Gallery);

		var _this = _possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call(this, props));

		_this.hanldeStateChange = function () {
			_this.setState({
				loading: !imagesLoaded(_this.galleryElement)
			});
		};

		_this.state = {
			loading: true
		};
		return _this;
	}

	_createClass(Gallery, [{
		key: "renderSpinner",
		value: function renderSpinner() {
			if (!this.state.loading) {
				return null;
			}
			return React.createElement("span", { className: "spinner", __source: {
					fileName: _jsxFileName,
					lineNumber: 22
				},
				__self: this
			});
		}
	}, {
		key: "renderImage",
		value: function renderImage(imageUrl) {
			return React.createElement(
				"div",
				{
					__source: {
						fileName: _jsxFileName,
						lineNumber: 28
					},
					__self: this
				},
				React.createElement("img", { src: imageUrl,
					onLoad: this.handleStateChange,
					onError: this.handleStateChange,
					__source: {
						fileName: _jsxFileName,
						lineNumber: 29
					},
					__self: this
				})
			);
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			return React.createElement(
				"div",
				{ className: "gallery",
					ref: function ref(element) {
						_this2.galleryElement = element;
					}, __source: {
						fileName: _jsxFileName,
						lineNumber: 45
					},
					__self: this
				},
				this.renderSpinner(),
				React.createElement(
					"div",
					{ className: "images", __source: {
							fileName: _jsxFileName,
							lineNumber: 48
						},
						__self: this
					},
					this.props.imageUrls.map(function (imageUrl) {
						return _this2.renderImage(imageUrl);
					})
				)
			);
		}
	}]);

	return Gallery;
}(React.Component);

function imagesLoaded(parentNode) {
	var imgElements = parentNode.querySelectorAll('img');
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = imgElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var img = _step.value;

			if (!img.complete) {
				return false;
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return true;
}

Gallery.propTypes = {
	imageUrls: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};