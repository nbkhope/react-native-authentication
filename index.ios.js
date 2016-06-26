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
  View,
  Navigator,
} from 'react-native';

import Root from './Root';
import Login from './Login';
import Register from './Register';
import Home from './Home';

class AuthApp extends Component {
  /**
   * Defines all the routes for the application
   */
  renderScene(route, navigator) {
    // For debug purposes
    console.log(route);

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
      <Navigator
        initialRoute={{ name: 'root' }}
        renderScene={this.renderScene.bind(this)}
      />
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

AppRegistry.registerComponent('AuthApp', () => AuthApp);
