import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import Button from './Button';
import Input from './Input';

const ACCESS_TOKEN = 'access_token';

class Login extends Component {
  constructor() {
    super();

    // Initialize the state of the component
    // Form fields should all be initialized here
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  redirect(routeName, token) {
    this.props.navigator.push({
      name: routeName,
      passProps: {
        accessToken: token, // pass the token as a property
                            //(accessToken will be available in this.props of
                            // the component that will be loaded)
      },
    });
  }

  /**
   * Stores the given access token in the AsyncStorage
   */
  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      this.getToken();
    }
    catch(error) {
      console.log("Error! Something went terribly wrong.");
    }
  }

  /**
   * Retrieves the access token from the AsyncStorage
   */
  async getToken() {
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log("The stored access token is " + token);
    }
    catch(error) {
      console.log("Error! Something went terribly wrong when retrieve the access token.");
    }
  }

  /**
   * Removes access token from the AsyncStorage
   */
  async removeToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      this.getToken();
    }
    catch (error) {
      console.log("Oops... could not remove token.");
    }
  }

  async onLoginPress() {
    try {
      let response = await fetch('https://afternoon-beyond-22141.herokuapp.com/api/login', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session: {
            email: this.state.email,
            password: this.state.password,
          }
        }),
      });

      let res = await response.text();

      if (response.status >= 200 && response.status < 300) {
        // Login was successful
        console.log("res: " + res);

        // Clear up the error state
        this.setState({ error: "" });

        // Set up the access token
        let accessToken = res;
        this.storeToken(accessToken);
        console.log("Stored access token in AsyncStorage.");

        // Redirect to home, passing the access token along
        this.redirect('home', accessToken);
      }
      else { // error in login
        console.log("res (error): " + res);
        let errors = res;
        throw errors;
      }
    }
    catch(error) {
      console.log("An error was caught!");

      this.setState({ error: error });

      // Remove token
      this.removeToken();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Please Login
        </Text>

        <Input
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus={true}
          keyboardType='email-address'
          returnKeyType='next'
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => this.setState({ password: text })}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry
        />

        <Button
          onPress={this.onLoginPress.bind(this)}
        >
          Login
        </Button>

        <Button
          onPress={() => this.props.navigator.pop()}
        >
          Cancel
        </Button>

        <Text>{this.state.error}</Text>
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

export default Login;
