import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = (props) => {
  const {
    placeholder,
    onChangeText,
    autoFocus,
    keyboardType,
    returnKeyType,
    secureTextEntry,
    autoCapitalize,
    autoCorrect,
  } = props;

  return (
    <TextInput
      placeholder={placeholder}
      style={styles.inputText}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize || 'none'}
      autoCorrect={autoCorrect || false}
      autoFocus={autoFocus}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  inputText: {
    backgroundColor: "#8D79AE",
    height: 50,
    padding: 6,
    borderWidth: 1,
    borderColor: "#19053A",
    marginBottom: 10,
  },
});

export default Input;
