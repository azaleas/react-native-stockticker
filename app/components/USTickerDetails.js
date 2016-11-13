import React, { Component } from 'react';

import {
  View,
  Text,
} from 'react-native';

import Orientation from 'react-native-orientation';

import _ from 'lodash';

import Styles from './../Styles';

import {
  MKButton,
  MKColor
} from 'react-native-material-kit';

let tickerData = [
		'Ticker', 
		'Date', 
		'Open', 
		'High', 
		'Low', 
		'Close', 
		'Volume', 
		'Ex-Dividend', 
		'Split Ratio', 
		'ADJ Open',
		'ADJ High',
		'ADJ Low',
		'ADJ Close',
		'ADJ Volume'
	];

class USTickerDetails extends Component {

    constructor(props) {
        super(props);
    }

    _tickerDataIterator = (startIndex, stopIndex) => {
    	let highregexp = new RegExp('high');
    	let lowregexp = new RegExp('low');
		return this.props.data.map((element, index) => {
			if(index >= startIndex && index <= stopIndex){
				if(highregexp.test(_.lowerCase(tickerData[index]))){
					return <Text key={index} style={[Styles.tickerInfo, Styles.tickerInfoHigh]}>{tickerData[index]}: {element}</Text>
				}
				else if(lowregexp.test(_.lowerCase(tickerData[index]))){
					return <Text key={index} style={[Styles.tickerInfo, Styles.tickerInfoLow]}>{tickerData[index]}: {element}</Text>
				}
				else{
					return <Text style={[Styles.tickerInfo]} key={index}>{tickerData[index]}: {element}</Text>
				}
			}
		});	
    }


    render() {
    	Orientation.lockToPortrait();
		navAction = (id) => {
			let title = ((id == "cpr") ? "Closing Prices Report" : "Volumes Report");
			this.props.navigator.push({
              id,
              title,
              data: this.props.historicalValue
            })
		}
        return (
            <View style={Styles.containerFull}>
				<View style={Styles.contentTopContainer}>
					<View style={Styles.contentTitleContainer}>
						<Text style={Styles.contentTitle}>{this.props.title}</Text>
						<Text style={Styles.contentDate}>{this.props.data[1]}</Text>
					</View>
					<View style={Styles.contentDescContainer}>
						{this._tickerDataIterator(2, 7)}
					</View>
					<View style={Styles.contentDescContainer}>
						{this._tickerDataIterator(8, 14)}
					</View>
				</View>
				<View style={[Styles.contentBottomContainer, Styles.containerCenter]}>
					<MKButton
		                style={[Styles.reportButton]}
		                onPress={() => {navAction('cpr')}}
		                rippleColor="rgba(0,0,0,0.30)">
		                <Text style={Styles.reportButtonText}>{"Closing Price Report"}</Text>
		            </MKButton>
		            <MKButton
		                style={[Styles.reportButton]}
		                onPress={() => {navAction('vr')}}
		                rippleColor="rgba(0,0,0,0.30)">
		                <Text style={Styles.reportButtonText}>{"Volumes Report"}</Text>
		            </MKButton>
				</View>
            </View>
        );
    }
}

export default USTickerDetails;