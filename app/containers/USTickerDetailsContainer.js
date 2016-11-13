import React, { Component } from 'react';

import {
  View,
  Text,
} from 'react-native';

import Orientation from 'react-native-orientation';

import _ from 'lodash';

import Styles from './../Styles';
import USTickerDetails from './../components/USTickerDetails';

import {
  MKButton,
  MKColor,
  MKSpinner,
} from 'react-native-material-kit';

import moment from 'moment';
import api from './../utils/api';


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

class USTickerDetailsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        	historicalValues: '',
        }
    }

    componentWillMount(){
        Orientation.lockToPortrait();
    	// get historical data: 6 month
    	let date = moment().format('YYYYMMDD');
		let prevdate = moment().subtract(6, 'month').format('YYYYMMDD');

    	tickerCode = this.props.title;
		api.fetchUSHistorical(tickerCode, date, prevdate)
	        .then((dataJSON) => {
	        	let data = dataJSON.datatable.data;
	            this.setState({
	            	historicalValues: data,
                    loaded: true,
	            })
	        })
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
                <USTickerDetails 
                	title={this.props.title} 
                	data={this.props.data} 
                    historicalValue={this.state.historicalValues}
                    navigator={this.props.navigator} />
            )
        );
    }
}

export default USTickerDetailsContainer;