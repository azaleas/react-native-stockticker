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
		"Date",
		"Open",
		"High",
		"Low",
		"Last",
		"Close",
		"Total Trade Quantity",
		"Turnover (Lacs)"
	];

class TickerDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	title: '',
        }
    }

    _tickerDataIterator = (allData, startIndex, stopIndex) => {
    	let highregexp = new RegExp('high');
    	let lowregexp = new RegExp('low');
		return allData.map((element, index) => {
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

    _currentData = (allData) => {
    	let databaseCode = allData.database_code;
		let data = allData.data;
		if(databaseCode == "SIX"){
	    	return (
				<View style={Styles.contentDescContainer}>
			    	<Text style={[Styles.tickerInfo]}>Price: {data[data.length-1][1]}</Text>
					<Text style={[Styles.tickerInfo]}>Volume: {data[data.length-1][2]}</Text>
				</View>
			)
		}
		else if(databaseCode == "NSE"){
			data = allData.data;
			mostCurrentData = data[data.length-1];
			return (
				<View style={[Styles.contentTopContainer]}>
					<View style={Styles.contentDescContainer}>
						{this._tickerDataIterator(mostCurrentData, 1, 4)}
					</View>
					<View style={Styles.contentDescContainer}>
						{this._tickerDataIterator(mostCurrentData, 5, 7)}
					</View>
				</View>
			)
		}
    }

    componentWillMount() {
    	let databaseCode = this.props.tickerData.database_code;
    	if(databaseCode == "SIX"){
	    	this.setState({
				title: "Volumes Report"
			})
    	}
    	else if(databaseCode == "NSE"){
	    	this.setState({
				title: "Turnover Report"
			})
    	}
    }

    render() {
    	Orientation.lockToPortrait();
    	let data = this.props.tickerData.data;
		navAction = (id) => {
			let title = ((id == "cpr") ? "Prices Report" : "Volumes Report");
			this.props.navigator.push({
              id,
              title,
              dataSet: this.props.tickerData.database_code,
              data: this.props.tickerData.data
            })
		}
        return (
            <View style={Styles.containerFull}>
				<View style={[Styles.contentTopContainer, Styles.containerColumn]}>
					<View style={Styles.contentTitleContainer}>
						<Text style={[Styles.contentTitle, Styles.tac, Styles.contentTitleSmall]}>{_.upperCase(this.props.title)}</Text>
						<Text style={Styles.contentDate}>Latest Date: {this.props.tickerData.end_date}</Text>
						<Text style={Styles.contentDate}>Currency: {this.props.currency}</Text>
					</View>
					{this._currentData(this.props.tickerData)}
				</View>
				<View style={[Styles.contentBottomContainer, Styles.containerCenter]}>
					<MKButton
		                style={[Styles.reportButton]}
		                onPress={() => {navAction('cpr')}}
		                rippleColor="rgba(0,0,0,0.30)">
		                <Text style={Styles.reportButtonText}>{"Prices Report"}</Text>
		            </MKButton>
		            <MKButton
		                style={[Styles.reportButton]}
		                onPress={() => {navAction('vr')}}
		                rippleColor="rgba(0,0,0,0.30)">
		                <Text style={Styles.reportButtonText}>{this.state.title}</Text>
		            </MKButton>
				</View>
            </View>
        );
    }
}

export default TickerDetails;