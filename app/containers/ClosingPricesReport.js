import React, { Component } from 'react';

import {
  View,
  Text,
  Dimensions
} from 'react-native';

import {HorizontalBarChart} from 'react-native-chart-android';

import Orientation from 'react-native-orientation';

import _ from 'lodash';

import Styles from './../Styles';

class ClosingPricesReports extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	data: '',
        }
    }    

	componentWillMount(){
		Orientation.lockToLandscape();
		let graphValues = [];
		let graphXValues = [];
		let graphYValues = [];
		let data = this.props.data;
		dataLength = data.length;
		data.filter((element, index) => {
			// Get data from the end of the month + last 5 days
			// Check if element is from general ticker. GT has 3 rows of data.
			if(element.length > 3){
				dateIndex = 1;
				priceIndex = 2;
			}
			else{
				dateIndex = 0;
				priceIndex = 1;
			}
			if(/-31$/.test(element[dateIndex]) 
				|| (/-30$/.test(element[dateIndex]) && !/-31$/.test(data[index+1][1]))
				|| (/-29$/.test(element[dateIndex]) && !/-30$/.test(data[index+1][1]))
				|| (/-28$/.test(element[dateIndex]) && !/-29$/.test(data[index+1][1]))				
				|| index >= dataLength - 3
			){
	            graphXValues.push(element[dateIndex]);
	            graphYValues.push(element[priceIndex]);
			}
        });
        this.setState({
			data:{
				yValues:[
				    {
				      data:graphYValues,
				      label:'',
				      config:{
				        color:'#1874cd',
				        valueTextColor: '#1874cd',
				        valueTextSize: 14,
				      },
				    }
				  ],
			  	xValues:graphXValues,
			  	animateY: {
				    duration: 1000,
			  	},
			}
        });
	}

    render() {
        return (
            <View style={[Styles.containerFull]}>
            	<Text style={Styles.reportTitle}>{"Closing Prices 6 months"}</Text>
                <View style={[Styles.containerGraph]}>
                	<HorizontalBarChart 
			            style={Styles.lineChart} 
			            data={this.state.data}
			            yAxisRight={{enable:false}} 
			            xAxis={{textColor:"black", axisLineWidth: 1, axisLineColor: "#c5c5c5", textSize:12,drawGridLines:false,position:"BOTTOM"}}
			            yAxis={{textColor:"black", axisLineWidth: 1, axisLineColor: "#c5c5c5", textSize:12,drawGridLines:false}}
			            description={""}
			            drawGridBackground={false}
                		backgroundColor={"#f1f1f1"} 
			            legend={{enable:false}}/>
                </View>
            </View>
        );
    }
}

export default ClosingPricesReports;