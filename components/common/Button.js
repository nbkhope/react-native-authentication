import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';

const Button = ({ children, onPress }) => {
  const { submitButton, buttonText } = styles;

  return (
    <TouchableHighlight
      style={submitButton}
      onPress={onPress}
    >
      <Text style={buttonText}>
        {children}
      </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
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
});

export { Button };
