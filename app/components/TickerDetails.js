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

class TickerDetails extends Component {

    constructor(props) {
        super(props);
    }

    render() {
    	Orientation.lockToPortrait();
		navAction = (id) => {
			let title = ((id == "cpr") ? "Prices Report" : "Volumes Report");
			this.props.navigator.push({
              id,
              title,
              data: this.props.tickerData.data
            })
		}
        return (
            <View style={Styles.containerFull}>
				<View style={[Styles.contentTopContainer, Styles.containerColumn]}>
					<View style={Styles.contentTitleContainer}>
						<Text style={Styles.contentTitle}>{_.upperCase(this.props.title)}</Text>
						<Text style={Styles.contentDate}>{this.props.tickerData.end_date}</Text>
						<Text style={Styles.contentDate}>Currency: {this.props.currency}</Text>
					</View>
					<View style={Styles.contentDescContainer}>
						<Text style={[Styles.tickerInfo]}>Price: {this.props.tickerData.data[0][1]}</Text>
						<Text style={[Styles.tickerInfo]}>Volume: {this.props.tickerData.data[0][2]}</Text>
					</View>
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
		                <Text style={Styles.reportButtonText}>{"Volumes Report"}</Text>
		            </MKButton>
				</View>
            </View>
        );
    }
}

export default TickerDetails;