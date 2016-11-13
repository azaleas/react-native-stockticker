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

class USTickersComponent extends Component {
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
        // console.log(rowData);
        let navAction = () =>{
            this.props.navigator.push({
              id: 'usTickerDetails',
              title: rowData[0],
              data: rowData
            })
        };
        return(
          <MKButton
              onPress={navAction}
              rippleColor="rgba(255, 20, 147, 0.3)">
              <View style={Styles.tickersContainer}>
                <View style={Styles.containerRow}>
                  <View style={Styles.containerLeft}>
                     <Text style={[Styles.tickerTitle]}>
                      {rowData[0]}
                    </Text>
                  </View>
                  <View style={[Styles.containerRight, Styles.contentRight]}>
                    <Text style={[Styles.tickerDate]}>
                      {rowData[1]}
                    </Text>
                  </View>
                </View>
                <View style={[Styles.tickerInfoWrapper]}>
                  <Text><Text style={Styles.bold}>Opened:</Text>{rowData[2]}</Text>
                  <Text><Text style={[Styles.bold, Styles.tickerInfoHigh]}>H:</Text><Text style={Styles.tickerInfoHigh}>{rowData[3]}</Text></Text>
                  <Text><Text style={[Styles.bold, Styles.tickerInfoLow]}>L:</Text><Text style={Styles.tickerInfoLow}>{rowData[4]}</Text></Text>
                  <Text><Text style={Styles.bold}>Closed:</Text>{rowData[5]}</Text>
                </View>
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

export default USTickersComponent;