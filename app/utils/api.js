import VARIABLES from './../env/variables';


import _ from 'lodash';

const API_STEM_WIKI = 'https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json';
const API_STEM_ISIN_CSV = 'http://static.quandl.com/SIX_Descriptions/isin_codes.csv';
const API_STEM_GENERAL = 'https://www.quandl.com/api/v3/datasets';
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
	},

	// Historical data for US tickers
	fetchUSHistorical: (tickerCode, currentDate, prevDate) => {
		let URL = `${API_STEM_WIKI}?date.gte=${prevDate}&date.lt=${currentDate}&ticker=${tickerCode}&api_key=${API_KEY}`;
		return fetch(URL)
    		.then((response) => response.json())
    		.then((responseJSON) => responseJSON)
    		.catch(function(err){
				console.warn("Error in fetchData", err);
			})
	},

	//getting isin (International Securities Identification Number) codes for swiss stock exchange
	isinCodes: () =>{
		let URL = API_STEM_ISIN_CSV;
		return fetch(URL)
			.then((response) => response.text())
			.then((responseText) => {
				responseText = responseText.split("\n");
				// Remove Company description Row
				responseText.splice(0, 1);
				return responseText;
			})
	},

	// Historical data for general tickers
	fetchHistorical: (tickerCode, currencyCode, dataSet, currentDate, prevDate) => {
		let URL = `${API_STEM_GENERAL}/${dataSet}/${tickerCode}${currencyCode}.json?start_date=${prevDate}&end_date=${currentDate}&api_key=${API_KEY}`;
		console.log(URL);
		return fetch(URL)
    		.then((response) => response.json())
    		.then((responseJSON) => responseJSON)
    		.catch(function(err){
				console.warn("Error in fetchData", err);
			})
	},
};

export default api;