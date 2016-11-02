import React, { Component } from 'react';
import { 
  Navigator, 
  BackAndroid 
} from 'react-native';

import Home from './containers/Home';
import USContainer from './containers/USContainer';


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
        }
    }

    render() {
        return (
        	<Navigator 
            	initialRoute={{id: 'home'}}
            	renderScene={this.navigatorRenderScene} />
        );
    }
}

export default App;