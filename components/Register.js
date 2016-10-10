import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { Button, Input } from './common';

class Register extends Component {
  constructor() {
    super();

    // Initialize the state of the component
    // Form fields should all be initialized here
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: [],
    };
  }

  redirect(routeName, token) {
    this.props.navigator.push({
      name: routeName,
      passProps: {
        accessToken: token,
      },
    });
  }

  /**
   * Note about bind(this):
   *   If you called onRegisterPress without bind(this), *this* would refer to
   *   the button itself (TouchableHighlight). If you do that and you try to
   *   refer to some property of the current component using this.state, it
   *   will not work. In order for you to get access to the state, you have to
   *   change the context of *this* to the actual outer component you are using.
   *   You can do that using onRegisterPress.bind(this)
   */

  async onRegisterPress() {
    try {
      let response = await fetch('https://afternoon-beyond-22141.herokuapp.com/api/users', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
          }
        }),
      });

      let res = await response.text();

      if (response.status >= 200 && response.status < 300) {
        // Registration was successful
        console.log("res: " + res);

        let accessToken = res;

        // Allow user to be taken to home without
        // having to login after registration
        this.redirect('home', accessToken);
      }
      else { // error in registration
        console.log("res (error): " + res);
        let errors = res;
        throw errors;
      }
    }
    catch(errors) {
      console.log("Errors were caught!");

      let formErrors = JSON.parse(errors);
      let errorsArray = [];

      // Populate the errorsArray by going through the errors received from
      // the backend
      for (var key in formErrors) {
        if (formErrors[key].length > 1) {
          formErrors[key].map(error => errorsArray.push(`${key} ${error}`));
        }
        else {
          errorsArray.push(`${key} ${formErrors[key]}`);
        }
      }

      this.setState({ errors: errorsArray });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Register an Account
        </Text>

        <Input
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
          autoFocus={true}
          keyboardType='email-address'
          returnKeyType='next'
        />
        <Input
          placeholder="Name"
          onChangeText={(text) => this.setState({ name: text })}
          autoCapitalize="words"
          returnKeyType='next'
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => this.setState({ password: text })}
          returnKeyType='next'
          secureTextEntry
        />
        <Input
          placeholder="Confirm Password"
          onChangeText={(text) => this.setState({ password_confirmation: text })}
          secureTextEntry
        />

        <Button
          onPress={this.onRegisterPress.bind(this)}
        >
          Register
        </Button>

        <Button
          onPress={() => this.props.navigator.pop()}
        >
          Cancel
        </Button>

        <Errors errors={this.state.errors} />
      </View>
    );
  }
}

// Stateless component to display the errors
const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error}>{error}</Text>)}
    </View>
  );
};

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

export default Register;
