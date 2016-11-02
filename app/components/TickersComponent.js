import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  RecyclerViewBackedScrollView
} from 'react-native';

import Styles from './../Styles';

import {
  MKButton,
  MKColor
} from 'react-native-material-kit';

class TickersComponent extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows([]),
        }
    }

    componentDidMount(){
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.props.totalData),
      });
    }

    componentWillReceiveProps(nextProps){
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(nextProps.totalData),
      });
    }

    _renderRow = (rowData) => {
        //console.log(rowData);
        let navAction = () =>{
            this.props.navigator.push({
              /*id: 'projectDetails',
              title: rowData.name,
              data: {
                id: rowData.id,
                title: rowData.name,
                terms: rowData.terms
              }*/
            })
        };
        return(
          <MKButton
              onPress={navAction}
              rippleColor="rgba(255, 20, 147, 0.3)">
              <View style={Styles.tickersContainer}>
                <Text style={[Styles.tickerTitle]}>
                  {rowData[0]}
                </Text>
              </View>
          </MKButton>
        )
    }


    render() {
    	return (
        	<ListView
              dataSource = {this.state.dataSource}
              renderRow = {this._renderRow}
              initialListSize = {10}
              pageSize = {20}
              renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
              //TO avoid warning message about empty sections
              enableEmptySections={true}
              removeClippedSubviews={true}
            />
        );
    }
}

export default TickersComponent;