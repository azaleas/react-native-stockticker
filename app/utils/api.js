import VARIABLES from './../env/variables';

const API_STEM_WIKI = 'https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json';
const API_KEY = VARIABLES.API_KEY;

let api = {
	
	// Fetch all us tickers for current or prev day
	fetchUSAll: (date) => {
		
		let URL = `${API_STEM_WIKI}?date=${date}&api_key=${API_KEY}`;
		return fetch(URL)
    		.then((response) => response.json())
    		.then((responseJSON) => responseJSON)
    		.catch(function(err){
				console.warn("Error in fetchData", err);
			})
	}
};

export default api;