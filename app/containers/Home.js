import React, { Component } from 'react';
import { 
  View, 
  Text,
  ListView
} from 'react-native';

import {
  MKButton,
  MKColor
} from 'react-native-material-kit';

import Styles from './../Styles';
import NavComponent from './../components/NavComponent';

let navData = {
    1: {
        'title' : "United States",
        'id': 'us'
    },
    2: {
        'title' : "Europe",
        'id': 'eu'
    },
    3: {
        'title' : "India",
        'id': 'in'
    },
    4: {
        'title' : "Japan",
        'id': 'jp'
    },
};

class Home extends Component {

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows([]),
        }
    }

    componentDidMount(){
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(navData)
        })
    }

    _renderRow = (rowData) => {
        let navAction = () =>{
            this.props.navigator.push({
              id: rowData.id,
              title: rowData.title,
            })
        };
        return (
            <MKButton
                style={[Styles.navItem, Styles.navButton]}
                onPress={navAction}
                rippleColor="rgba(0,0,0,0.30)">
                <View>
                    <NavComponent id={rowData.id} title={rowData.title}/>
                </View>
            </MKButton>
        );
    }

    render() {
        return (
            <View style={Styles.containerFull}>
            	<View style={Styles.headerWrapper}>  
	                <Text style={Styles.headerText}>{"Quandl Database"}</Text>
	                <Text style={[Styles.headerText, Styles.headerDesc]}>{"Financial & Economic Data"}</Text>
	            </View>
            	<View style={Styles.contentWrapper}>
            		<ListView
	                    contentContainerStyle={[Styles.navList]}
	                    dataSource = {this.state.dataSource}
	                    renderRow = {this._renderRow}
	                    //TO avoid warning message about empty sections
	                    enableEmptySections={true}
	                />
                </View>
            </View>
        );
    }
}

export default Home;