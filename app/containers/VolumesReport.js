import React, { Component } from 'react';

import {
  View,
  Text,
} from 'react-native';

import Orientation from 'react-native-orientation';

import {LineChart} from 'react-native-chart-android';

import _ from 'lodash';

import Styles from './../Styles';


class VolumesReport extends Component {

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
		let	dataLength = data.length;
		let dataSet = this.props.dataSet;
		data.filter((element, index) => {
			// Get data from the end of the month + last 5 days
			if(dataSet == "WIKI"){
				dateIndex = 1;
				priceIndex = 6;
				this.setState({
					title: "Volumes Data for 6 months"
				});
			}
			else if (dataSet == "SIX"){
				dateIndex = 0;
				priceIndex = 2;
				this.setState({
					title: "Volumes Data for 6 months"
				});
			}
			else if (dataSet == "NSE"){
				dateIndex = 0;
				priceIndex = 2;
				this.setState({
					title: "Turnover(Lacs) Data for 6 months"
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
				        color:'#add8e6',
				        valueTextColor: '#1874cd',
				        valueTextSize: 10,
				        drawCircles: false,
				        drawFill: true,
          				bezier: true,
          				fillColor: '#add8e6',
          				lineWidth: 2,
				      },
				    }
				  ],
			  	xValues:graphXValues,
			  	/*animateY: {
				    duration: 1000,
			  	},*/
			  	animateX: {
				    duration: 2000,
			  	}
			}
        });
	}

    render() {
        return (
            <View style={[Styles.containerFull]}>
            	<Text style={Styles.reportTitle}>{this.state.title}</Text>
                <View style={[Styles.containerGraph]}>
                	<LineChart 
			            style={Styles.lineChart} 
			            data={this.state.data}
			            yAxisRight={{enable:false}} 
			            xAxis={{avoidFirstLastClipping: true, labelsToSkip: 0, labelRotationAngle: -45, textColor:"black", axisLineWidth: 1, axisLineColor: "#c5c5c5", textSize:10, drawGridLines:false, position:"BOTTOM"}}
			            yAxis={{textColor:"black", axisLineWidth: 1, axisLineColor: "#c5c5c5", textSize:12, drawGridLines:false}}
			            description={""}
			            extraOffsets={"0 30 0 0"}
			            drawGridBackground={false}
                		backgroundColor={"#f1f1f1"} 
 			            legend={{enable:false}}/>
                </View>
            </View>
        );
    }
}

export default VolumesReport;