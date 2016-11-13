import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  RecyclerViewBackedScrollView
} from 'react-native';

import _ from 'lodash';

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
        let companyName = _.upperCase(rowData.split("|")[0]);
        let tickerCode = rowData.split("|")[1];
        let navAction = () =>{
            this.props.navigator.push({
              id: 'tickerDetails',
              title: rowData.split("|")[0],
              data: {
                tickerCode: (tickerCode).slice(0, tickerCode.length - 1),
                dataSet: 'SIX',
                currencyCode: 'CHF',
                currency: 'Swedish Krona'
              }
            })
        };
        return(
          <MKButton
              onPress={navAction}
              rippleColor="rgba(255, 20, 147, 0.3)">
              <View style={[Styles.tickersContainer, Styles.containerCenter]}>
                <Text style={[Styles.tickerTitle]}>
                  {companyName}
                </Text>
                <Text style={[Styles.tickerCode]}>
                  {rowData.split("|")[1]}
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