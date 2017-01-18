import React, { Component } from 'react';
import { 
  View, 
  Text,
  TextInput,
} from 'react-native';

import TickersComponent from './../components/TickersComponent';

import {
  MKButton,
  MKColor,
  MKSpinner,
} from 'react-native-material-kit';

import _ from 'lodash';

import api from './../utils/api';

import Styles from './../Styles';

import Orientation from 'react-native-orientation';

// Options for spinner

let spinnerOptions = {
    duration: 600,
    strokeColor: "#ED127B"
};

// Built spinner

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withSpinnerAniDuration(spinnerOptions.duration)
  .withStrokeColor(spinnerOptions.strokeColor)
  .build()

class IndiaContainer extends Component {

    constructor(props) {
    	/* totalData will be used as autocomplete, 
        to add all data back allData will be used. allISIN will hold isin codes */
        super(props);
        this.state = {
        	loaded: false,
            totalData: '',
            allData: '',
            allISIN: '',
            searchStatus: '',
            currency: 'Rs. Cr',
            currencyCode: '',
            dataSet: 'NSE',
        };
    }

    componentWillMount(){

        Orientation.lockToPortrait();

        api.zippedCodes('NSE')
            .then((nseCodesAll) => {
                // remove NSE
                let responseALL = [];
                let nseCodesList = [];
                nseCodesAll.filter((element, index) => {
                    removeNSE = element.replace('NSE/', '');
                    responseALL.push(removeNSE);
                    nseCodesList.push(removeNSE.split(",")[0]);
                });
                this.setState({
                    loaded: true,
                    allNSE: nseCodesList,
                    totalData: responseALL,
                    allData: responseALL,
                    searchStatus: "Total tickers: " + responseALL.length,
                });
            })
    }

    _handleTextChange = (text) =>{
    	let searchText = text;

    	let searchregexp = new RegExp(searchText, "i");


    	// Update listview with text from textarea aka autocomplete
    	let searchResults = this.state.allData.filter((element, index) => {
			return searchregexp.test(element);
    	});
    	if(searchResults.length == 0){
    		this.setState({
	            totalData: this.state.allData,
	            searchStatus: "No matches were found. Try again.",
	        });
    	}
    	else{
	    	this.setState({
	            totalData: searchResults,
	            searchStatus: "Total tickers: " + searchResults.length,
	        });
    	}
    }

    render() {
        return (
        	!this.state.loaded 
            ? (
                <View style={[Styles.containerFull, Styles.containerCenter]}>
                    <SingleColorSpinner/>
                </View>
            ) 
            : (
	            <View style={Styles.containerFull}>
	        		<View style={Styles.headerWrapper}>  
		                <Text style={Styles.headerText}>{this.props.title}</Text>
		                <Text style={[Styles.headerText, Styles.headerDesc]}>{"National Stock Exchange of India"}</Text>
		            </View>
		            <View style={[Styles.contentWrapper, Styles.usContentWrapper]}>
		            	<View style={Styles.inputWrapper}>
							<TextInput
					            style={Styles.textInputField}
					            onChangeText={this._handleTextChange}
					            autoCapitalize={'characters'}
					            maxLength={20}
					            placeholder="Enter Company Name or NSE code" />
		            	</View>
		            	<View style={Styles.bookmarksWrapper}>
							<Text>{this.state.searchStatus}</Text>
							<TickersComponent 
                                navigator={this.props.navigator}  
                                totalData={this.state.totalData}
                                currency={this.state.currency}
                                currencyCode={this.state.currencyCode}
                                dataSet={this.state.dataSet} />
		            	</View>
		            </View>
	            </View>
        	)
        );
    }
}

export default IndiaContainer;