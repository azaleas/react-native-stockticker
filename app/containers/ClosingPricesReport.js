import React, { Component } from 'react';

import {
  View,
  Text,
  Dimensions
} from 'react-native';

import {HorizontalBarChart, BarChart} from 'react-native-chart-android';

import Orientation from 'react-native-orientation';

import _ from 'lodash';

import Styles from './../Styles';

class ClosingPricesReports extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	data: '',
        	title: '',
        }
    }    

	componentWillMount(){
		Orientation.lockToLandscape();
		let graphValues = [];
		let graphXValues = [];
		let graphYValues = [];
		let data = this.props.data;
		let dataLength = data.length;
		let dataSet = this.props.dataSet;
		data.filter((element, index) => {
			// Get data from the end of the month + last 5 days
			// Check if element is from general ticker. GT has 3 rows of data.
			if(dataSet == "WIKI"){
				dateIndex = 1;
				priceIndex = 2;
				this.setState({
					title: "Closing Prices for last 6 months"
				});
			}
			else if(dataSet == "NSE"){
				dateIndex = 0;
				priceIndex = 5;
				this.setState({
					title: "Closing Prices for last 6 months"
				});
			}
			else if (dataSet == "SIX"){
				dateIndex = 0;
				priceIndex = 1;
				this.setState({
					title: "Prices for last 6 months"
				});
			}

			if(/-31$/.test(element[dateIndex]) 
				|| (/-30$/.test(element[dateIndex]) && !/-31$/.test(data[index+1][dateIndex]))
				|| (/-29$/.test(element[dateIndex]) && !/-30$/.test(data[index+1][dateIndex]))
				|| (/-28$/.test(element[dateIndex]) && !/-29$/.test(data[index+1][dateIndex]))				
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

	_chart = (dataSet) => {
		if (dataSet == "SIX"){
			return (
				<BarChart 
		            style={Styles.lineChart} 
		            data={this.state.data}
		            yAxisRight={{enable:false}} 
		            xAxis={{textColor:"black", axisLineWidth: 1, axisLineColor: "#c5c5c5", textSize: 10, labelRotationAngle: -45, drawGridLines:false,position:"BOTTOM"}}
		            yAxis={{textColor:"black", axisLineWidth: 1, axisLineColor: "#c5c5c5", textSize:12, drawGridLines:false}}
		            description={""}
		            drawGridBackground={false}
	        		backgroundColor={"#f1f1f1"} 
		            legend={{enable:false}}/>
			)
		}
		else{
			return (
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
			)
		}
	}

    render() {
        return (
            <View style={[Styles.containerFull]}>
            	<Text style={Styles.reportTitle}>{this.state.title}</Text>
                <View style={[Styles.containerGraph]}>
                	{this._chart(this.props.dataSet)}
                </View>
            </View>
        );
    }
}

export default ClosingPricesReports;