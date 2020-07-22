//  babel ./client/src --presets $NODE_PATH/babel-preset-react-app --out-dir ./client/dist 



const API_URL = "https://api.unsplash.com/photos/random?client_id=drU4-qjUFXQeDawLcnonGPaYEQvKDdcDjSdN6i5g1rw&count=25&count=25";

fetch(API_URL)
	.then(response => response.json())
	.then(data => {
		
		let urls = data.map(d => d.urls.small);
		
		ReactDOM.render(<Gallery imageUrls={urls}/>, document.getElementById('app'));				
	})
	.catch(err => {
		ReactDOM.render(<p>Error</p>);
	});