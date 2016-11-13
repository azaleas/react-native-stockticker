import {StyleSheet, Dimensions, StatusBar} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;
const primaryColor = '#ed127b';

// Precalculate Device Dimensions for better performance
const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

// Calculating ratio from iPhone breakpoints
const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1 ;
const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1 ;

// We set our base font size value
const base_unit = 16;

// We're simulating EM by changing font size according to Ratio
const unit = base_unit * ratioX;

// We add an em() shortcut function 
function em(value) {
  return unit * value;
}

/*
	#General
		Containers
		Text manipulations
		Header
	#Nav
	#Input Field
	#Ticker Info
	#Reports
*/

const Styles = StyleSheet.create(
	{
		// #General
		// Containers
		containerFull:{
			flex: 1,
			backgroundColor: '#fff',
		},
		containerCenter:{
			alignItems: 'center',
			justifyContent: 'center',
		},
		containerRow:{
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		containerColumn:{
			flexDirection: 'column',
		},
		contentTopContainer:{
			flex: 6,
			flexDirection: 'row',
			backgroundColor: 'lightblue',
		},
		contentBottomContainer:{
			flex: 6, 
			backgroundColor: '#f0f8ff',
		},
		contentTitleContainer:{
			flex: 5,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#f0ffff',
		},
		contentDescContainer:{
			flex: 6,
			backgroundColor: '#e0eeee',
			justifyContent: 'center',
			alignItems: 'center',
		},
		// Text Manipulations
		tac:{
			textAlign: 'center',
			alignSelf: 'center',
		},
		tar:{
			textAlign: 'right',
			alignSelf: 'flex-end',
		},
		bold:{
			fontWeight: 'bold',
		},
		contentTitle:{
			fontSize: em(2.25),
			fontWeight: 'bold',
			color: '#000'
		},
		contentDate:{
			fontSize: em(1),
			color: '#000'
		},
		// Header
		headerWrapper:{
			flex: 3,
			width: windowWidth,
			// padding: 5,
			backgroundColor: "#f1f1f1",
			alignSelf: 'center',
			alignItems: 'center',
			justifyContent: 'center',
		},
		headerText:{
			color: "#000",
			fontSize: em(2),
			fontWeight: 'bold',
		},
		headerDesc:{
			fontSize: em(1),
			fontWeight: 'normal'
		},
		contentWrapper:{
			flex: 11,
			flexDirection: 'row',
			alignItems: 'center',
	    	justifyContent: 'center',
		},
		// #Nav
		navList:{
			margin: 10,
			flexDirection: 'row',
	    	flexWrap: 'wrap',
	    	alignItems: 'flex-start',
	    	justifyContent: 'center',
		},
		navItem:{
			margin: 10,
			width: Dimensions.get('window').width/2.5,
			height: Dimensions.get('window').height/5,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: "#f2f2f2",
		},
		navText:{
			fontSize: em(1),
			fontWeight: 'bold'
		},
		usContentWrapper:{
			flexDirection: 'column',
			justifyContent: 'flex-start',
			alignItems: 'center',
		},
		tickerInfo:{
			fontSize: em(0.8),
			fontWeight: 'bold',
			color: "#000",
			marginVertical: em(0.75),
		},
		// #Input Field
		inputWrapper:{
			flex: 2,
			flexDirection: 'column',
			width: Dimensions.get('window').width/1.5,
		},
		textInputField:{
			textAlign: 'center',
		},
		bookmarksWrapper:{
			flex: 10,
			width: Dimensions.get('window').width,
			justifyContent: 'flex-start',
			alignSelf: 'flex-start',
			padding: 10,
		},
		// #Ticker Data
		tickersContainer:{
			padding: 5,
			marginVertical: 1,
			backgroundColor: '#f5f5f5'
		},
		tickerTitle:{
			fontSize: em(1),
			fontWeight: 'bold',
		},
		tickerCode:{
			fontSize: em(0.75),
			marginVertical: em(0.25),
		},
		tickerDate:{
			fontSize: em(0.8),
		},
		tickerInfoWrapper:{
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingVertical: 10,
		},
		tickerInfoHigh:{
			color: 'darkgreen'
		},
		tickerInfoLow:{
			color: 'red'
		},
		// #Reports
		reportButton:{
			marginVertical: em(0.5),
			width: windowWidth/1.5 - 10,
			backgroundColor: '#7ac5cd',
			padding: em(1),
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 5,
		},
		reportButtonText:{
			fontSize: em(1.15),
			color: "#fff",
			fontWeight: 'bold',
		},
		reportsTitle:{
			//alignSelf: 'center',
			textAlign: 'center',
			padding: 10,
			backgroundColor: '#f8f8ff',
			//width: windowWidth,
			fontSize: em(1),
			color: '#000',
			fontWeight: 'bold',
		},
		containerReports:{
			backgroundColor: '#f8f8ff',
			flex: 6,
		},
		reportTitle:{
			fontSize: em(1),
			fontWeight: 'bold',
			//alignSelf: 'center',
			textAlign: 'center',
			padding: 5,
			color: '#003',
		},
		containerGraph:{
			alignSelf: 'center',
			backgroundColor: '#404040',
			flex: 1,
			//height: windowWidth - statusBarHeight - 15 - em(1),
		},
		lineChart:{
			flex: 1,
			width: windowHeight,
			height: windowWidth - statusBarHeight - 15 - em(1),
		}
	}
);

export default Styles;