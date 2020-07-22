/*
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
*/
//https://www.javascriptstuff.com/react-image-gallery/

class Gallery extends React.Component { 

	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	} 

	renderSpinner() {
		if (!this.state.loading) {
			return null;
		}
		return (
			<span className="spinner" />
		);
	}

	renderImage(imageUrl) {
		return (
			<div>
				<img src={imageUrl} 
				onLoad={this.handleStateChange} 
				onError={this.handleStateChange} 
				/>
			</div>
		);
	}

	hanldeStateChange = () => {
		this.setState({
			loading: !imagesLoaded(this.galleryElement)
		});
	};

	render() {
		return (
			<div className="gallery" 
				ref={ element => {this.galleryElement = element;} }>
				{this.renderSpinner()}
				<div className="images">
					{ this.props.imageUrls.map(imageUrl => this.renderImage(imageUrl)) }
				</div>
			</div>
		);
	}
}

function imagesLoaded(parentNode) {
	const imgElements = parentNode.querySelectorAll('img');
	for (const img of imgElements) {
		if (!img.complete) {
			return false;
		}
	}
	return true;
}

Gallery.propTypes = {
	imageUrls: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

