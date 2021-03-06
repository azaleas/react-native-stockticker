import React, { Component } from 'react';
import { 
  View, 
  Text,
  TextInput,
} from 'react-native';

import moment from 'moment';

import USTickersComponent from './../components/USTickersComponent';

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

class USContainer extends Component {

    constructor(props) {
    	// totalData will be used as autocomplete, to add all data back allData will be used
        super(props);
        this.state = {
        	loaded: false,
        	dataJSON: '',
            totalData: '',
            allData: '',
            searchStatus: ''
        };
    }

    componentWillMount(){

    Orientation.lockToPortrait();

	let date = moment().format('YYYYMMDD');

	let tickers = [];
	let totalData = [];

    let dayCounter = 0;

    let dataTest = (date) => {
        api.fetchUSAll(date)
            .then((dataJSON) => {
                let data = dataJSON.datatable.data;
                if(data.length <= 0){
                    dayCounter++;
                    let date = moment().subtract(dayCounter, 'days').format('YYYYMMDD');
                    dataTest(date);
                }
                else{
                    this.setState({
                        dataJSON: data,
                    })
                    this.state.dataJSON.filter((element, index) => {
                        totalData.push(element);
                    });
                    this.setState({
                        loaded: true,
                        totalData,
                        allData: totalData,
                        searchStatus: "Total tickers: " + totalData.length,
                    });
                }
            })
        }
    dataTest(date);
    }

    _handleTextChange = (text) =>{
    	let tickerCode = _.upperCase(text);

    	let searchregexp = new RegExp("^" + tickerCode);


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
		                <Text style={[Styles.headerText, Styles.headerDesc]}>{"Wiki EOD Stock Prices"}</Text>
		            </View>
		            <View style={[Styles.contentWrapper, Styles.usContentWrapper]}>
		            	<View style={Styles.inputWrapper}>
							<TextInput
					            style={Styles.textInputField}
					            onChangeText={this._handleTextChange}
					            autoCapitalize={'characters'}
					            maxLength={20}
					            placeholder="Enter ticker code for US company" />
		            	</View>
		            	<View style={Styles.bookmarksWrapper}>
							<Text>{this.state.searchStatus}</Text>
							<USTickersComponent navigator={this.props.navigator}  totalData={this.state.totalData} />
		            	</View>
		            </View>
	            </View>
        	)
        );
    }
}

export default USContainer;
