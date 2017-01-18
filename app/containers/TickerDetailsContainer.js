import React, { Component } from 'react';

import { 
  View, 
  Text,
  TextInput,
} from 'react-native';


import {
  MKButton,
  MKColor,
  MKSpinner,
} from 'react-native-material-kit';

import Orientation from 'react-native-orientation';

import _ from 'lodash';

import Styles from './../Styles';
import TickerDetails from './../components/TickerDetails';

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

const stopFetch = false;

class TickerDetailsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	data: '',
            loaded: false,
        }
    }

    componentWillUnmount(){
        stopFetch = true;
    }

    componentWillMount(){
        stopFetch = false;
        Orientation.lockToPortrait();
    	// get historical data: 6 month
    	let date = moment().format('YYYY-MM-DD');
		let prevdate = moment().subtract(6, 'month').format('YYYY-MM-DD');

        let tickerCode = this.props.data.tickerCode;
    	let dataSet = this.props.data.dataSet;
        let currency = this.props.data.currencyCode;

        let currencyNumber = 0;

        let dataTest = (currencyNumber) => {
            currencyCode = currency + currencyNumber;
            api.fetchHistorical(tickerCode, currencyCode, dataSet, date, prevdate)
            .then((dataJSON) => {
                let data = dataJSON.dataset;
                if(!stopFetch){
                    if(typeof data != 'undefined'){
                        this.setState({
                            data: dataJSON.dataset,
                            loaded: true,
                        })
                    }
                    else{
                            if(dataSet == "SIX"){
                                currencyNumber++;
                                dataTest(currencyNumber);
                            }
                    }
                }
            })
        }
        dataTest(currencyNumber);
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
                <TickerDetails 
                    title={this.props.title} 
                    tickerData={this.state.data}
                    currency={this.props.data.currency}
                    navigator={this.props.navigator} />
            )
        );
    }
}

export default TickerDetailsContainer;