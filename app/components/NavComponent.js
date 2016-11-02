import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';

import Styles from './../Styles';


class NavComponent extends Component {

    setNativeProps(nativeProps) {
        this._root.setNativeProps(nativeProps);
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View 
                style={[Styles.navWrapper]}>
                <View style={[Styles.navElement]}>
                    <Text style={[Styles.navText]}>{this.props.title}</Text>
                </View>
                
            </View>
        );
    }
}

export default NavComponent;