import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';

class Root extends Component {
  /**
   * Navigates to the given route name using the navigator
   */
  navigate(routeName) {
    this.props.navigator.push({
      name: routeName,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome!
        </Text>

        <TouchableHighlight
          style={styles.submitButton}
          onPress={this.navigate.bind(this, 'login')}
        >
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.submitButton}
          onPress={this.navigate.bind(this, 'register')}
        >
          <Text style={styles.buttonText}>
            Register
          </Text>
        </TouchableHighlight>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputText: {
    backgroundColor: "#8D79AE",
    height: 50,
    padding: 6,
    borderWidth: 1,
    borderColor: "#19053A",
    marginBottom: 10,
  },
  submitButton: {
    height: 50,
    backgroundColor: "#482E74",
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonText: {
    color: "#8D79AE",
    alignSelf: 'center',
    fontSize: 20,
  },
  error: {
    color: "red",
  },
});

export default Root;
