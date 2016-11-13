import React, { Component } from 'react';
import { 
  Navigator, 
  BackAndroid 
} from 'react-native';

import Orientation from 'react-native-orientation';

import Home from './containers/Home';
import USContainer from './containers/USContainer';
import EuropeContainer from './containers/EuropeContainer';
import USTickerDetailsContainer from './containers/USTickerDetailsContainer';
import TickerDetailsContainer from './containers/TickerDetailsContainer';
import ClosingPricesReport from './containers/ClosingPricesReport';
import VolumesReport from './containers/VolumesReport';


/*Back Button For Android*/

BackAndroid.addEventListener('hardwareBackPress', function() {
 if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

class App extends Component {
	navigatorRenderScene(route, navigator) {
        _navigator = navigator;
        switch (route.id) {
          case 'home':
            return (<Home navigator={navigator} title="Home" />);
          case 'us':
            return (<USContainer navigator={navigator} title={route.title} />);
          case 'usTickerDetails':
            return (<USTickerDetailsContainer navigator={navigator} data={route.data} title={route.title} />);
          case 'cpr':
            return (<ClosingPricesReport navigator={navigator} data={route.data} title={route.title} />);
          case 'vr':
            return (<VolumesReport navigator={navigator} data={route.data} title={route.title} />);  
          case 'eu':
            return (<EuropeContainer navigator={navigator} title={route.title} />);
          case 'tickerDetails':
            return (<TickerDetailsContainer navigator={navigator} data={route.data} title={route.title} />);
        }
    }

    render() {
        Orientation.lockToPortrait();
        return (
        	<Navigator 
            	initialRoute={{id: 'home'}}
            	renderScene={this.navigatorRenderScene} />
        );
    }
}

export default App;