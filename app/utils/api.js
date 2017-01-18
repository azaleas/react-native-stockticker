import VARIABLES from './../env/variables';

import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';
import ZipArchive from 'react-native-zip-archive';
import _ from 'lodash';
import moment from 'moment';

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
		if(dataSet == "SIX"){
			let URL = `${API_STEM_GENERAL}/${dataSet}/${tickerCode}${currencyCode}.json?start_date=${prevDate}&end_date=${currentDate}&order=asc&api_key=${API_KEY}`;
			return fetch(URL)
	    		.then((response) => response.json())
	    		.then((responseJSON) => responseJSON)
	    		.catch(function(err){
					console.warn("Error in fetchData", err);
				})
		}
		else if(dataSet == "NSE"){
			/*NSE - some stocks have end date of 2015, so we need to fetch twice. 
			first fetch gives us correct dates. second fetch gives us historical data.*/
			let URL_STANDART = `${API_STEM_GENERAL}/${dataSet}/${tickerCode}.json?api_key=${API_KEY}`;
			return fetch(URL_STANDART)
				.then((response) => response.json())
	    		.then((responseJSON) => {
					let newestDate = responseJSON.dataset.newest_available_date;
					let newestDateMoment = moment(newestDate);
					let prevDate = newestDateMoment.subtract(6, 'month').format('YYYY-MM-DD');
					let URL = `${API_STEM_GENERAL}/${dataSet}/${tickerCode}.json?start_date=${prevDate}&end_date=${newestDate}&order=asc&api_key=${API_KEY}`;
					return fetch(URL)
			    		.then((response) => response.json())
			    		.then((responseJSON) => responseJSON)
			    		.catch(function(err){
							console.warn("Error in fetchData", err);
						})
	    		})
	    		.catch(function(err){
					console.warn("Error in fetchData", err);
				}) 
		}
	},

	// will extract zipped csv file data

	zippedCodes: (dataSet) => {
		let URL = `https://www.quandl.com/api/v3/databases/${dataSet}/codes?api_key=${API_KEY}`;
		let pathZip = '';
		let targetPath = RNFS.DocumentDirectoryPath;
		let pathToCSVFile = '';
		let csvName = '';
		let codesAll = '';

		return RNFetchBlob.config({
			fileCache : true,
			appendExt: 'zip'
		})
			.fetch('GET', URL)
			//.progress((received, total) => {console.log('progress', received / total)})
			.then((res) => {
				//console.log('The file saved to ', res.path());
				pathZip = res.path();
				return ZipArchive.unzip(pathZip, targetPath)
					.then(() => {
					  //console.log('unzip completed!')
					  return RNFetchBlob.fs.ls(targetPath)
					    // files contains filenames
					    .then((files) => {
					        files.filter((element, index) =>{
					        	if(element.indexOf('.csv') != -1){
					        		csvName = element;
					        	}
					        })
					        pathToCSVFile = targetPath + "/" + csvName;
					        return RNFetchBlob.fs.readFile(pathToCSVFile, 'utf8')
								.then((data) => {
									codesAll = data.split("\n");
									// Delete csv file
									RNFS.unlink(pathToCSVFile)
									  .then(() => {
									    //console.log('FILE DELETED');
									  })
									  .catch((err) => {
									    console.log(err.message);
									  });
								  	return codesAll;
								})
					    })
					})
					.catch((error) => {
					  console.log(error)
					})
				// Delete zip file
				res.flush();
			})
			// Status code is not 200
			.catch((errorMessage, statusCode) => {
				console.log(errorMessage);
			})
	},
};

export default api;