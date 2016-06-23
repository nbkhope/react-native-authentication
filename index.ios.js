/**
 * React Native Authentication
 * https://github.com/nbkhope/react-native-authentication
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Register from './Register';

class MyApp extends Component {
  /**
   * Defines all the routes for the application
   */
  renderScene(route, navigator) {
    if (route.name === 'root') {
      return <Root navigator={navigator} />
    }
    else if (route.name === 'login') {
      return <Login navigator={navigator} />
    }
    else if (route.name === 'register') {
      return <Register navigator={navigator} />
    }
    else if (route.name === 'home') {
      return <Home navigator={navigator} {...route.passProps} />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{ name: 'root' }}
          renderScene={this.renderScene.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('MyApp', () => MyApp);
