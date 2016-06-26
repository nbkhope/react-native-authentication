import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: this.props.accessToken,
    };
  }

  redirect(routeName) {
    this.props.navigator.push({
      name: routeName,
    });
  }

  async deleteToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
    }
    catch(error) {
      console.log("Failed to delete token.");
    }

  }

  onLogoutPress() {
    // wipes out the access token from AsyncStorage
    this.deleteToken();

    // Redirect to the root view
    this.redirect('root');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome back to our System!
        </Text>

        <Text>
          Your access token is {this.state.accessToken}
        </Text>

        <TouchableHighlight
          style={styles.submitButton}
          onPress={this.onLogoutPress.bind(this)}
        >
          <Text style={styles.buttonText}>
            Logout
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

export default Home;
