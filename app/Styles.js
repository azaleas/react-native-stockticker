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
		Header
	#Nav
	#Input Field
*/

const Styles = StyleSheet.create(
	{
		// #General
		containerFull:{
			flex: 1,
			backgroundColor: '#fff',
		},
		containerCenter:{
			alignItems: 'center',
			justifyContent: 'center',
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
		tickersContainer:{
			padding: 5,
			marginVertical: 1,
			backgroundColor: '#f5f5f5'
		},
		tickerTitle:{
			padding: 10,
			fontSize: em(1),
		}
	}
);

export default Styles;