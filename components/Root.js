import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Root extends Component {
  componentWillMount() {
    this.getToken();
  }

  /**
   * Navigates to the given route name using the navigator
   */
  navigate(routeName) {
    this.props.navigator.push({
      name: routeName,
    });
  }

  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log(accessToken);

      if (!accessToken) {
        console.log("Token not set");
      }
      else {
        // Makes sure the stored token is valid
        this.verifyToken(accessToken);
      }
    }
    catch(error) {
      console.log("Error when trying to get token.");
    }
  }

  async verifyToken(token) {
    let accessToken = token;

    try {
      // note about end point: expects session[access_token] set to value given
      let response = await fetch('https://afternoon-beyond-22141.herokuapp.com/api/verify?session%5Baccess_token%5D=' + accessToken);
      let res = await response.text();

      if (response.status >= 200 && response.status < 300) {
        console.log("Token verified. Response from backend is: ");
        console.log(res);

        // Token verified successfully, so redirect to home
        this.navigate('home');
      }
      else {
        // We got a bad response
        let error = res;
        throw error;
      }
    }
    catch(error) {
      console.log("Error in verifyToken: " + error);
    }
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
