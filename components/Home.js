import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { Button } from './common';

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

        <Button
          onPress={this.onLogoutPress.bind(this)}
        >
          Logout
        </Button>
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
  error: {
    color: "red",
  },
});

export default Home;
