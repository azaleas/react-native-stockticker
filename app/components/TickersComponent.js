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

const companyName = "";
const tickerCode = "";
const dataTickerCode = "";

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
        let dataSet = this.props.dataSet;

        switch (dataSet){
          case "SIX":
              companyName = _.upperCase(rowData.split("|")[0]);
              tickerCode = rowData.split("|")[1];
            break;
          case "NSE":
              companyName = _.upperCase(rowData.split(",")[1]);
              tickerCode = rowData.split(",")[0];
            break;
        }

        let navAction = () =>{
            let dataSet = this.props.dataSet;

            switch (dataSet){
              case "SIX":
                  companyName = _.upperCase(rowData.split("|")[0]);
                  tickerCode = rowData.split("|")[1];
                  dataTickerCode = (tickerCode).slice(0, tickerCode.length - 1);
                break;
              case "NSE":
                  companyName = _.upperCase(rowData.split(",")[1]);
                  tickerCode = rowData.split(",")[0];
                  dataTickerCode = tickerCode;
                break;
            }
            this.props.navigator.push({
              id: 'tickerDetails',
              title: companyName,
              data: {
                tickerCode: dataTickerCode,
                dataSet: this.props.dataSet,
                currencyCode: this.props.currencyCode,
                currency: this.props.currency
              }
            })
        };
        return(
          <MKButton
              onPress={navAction}
              rippleColor="rgba(255, 20, 147, 0.3)">
              <View style={[Styles.tickersContainer, Styles.containerCenter]}>
                <Text style={[Styles.tickerTitle, Styles.tac]}>
                  {companyName}
                </Text>
                <Text style={[Styles.tickerCode, Styles.tac]}>
                  {tickerCode}
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