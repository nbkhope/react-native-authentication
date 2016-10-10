import React from 'react';
import { TextInput } from 'react-native';

const Input = (props) => {
  const { placeholder, onChangeText, autoFocus } = props;
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.inputText}
      onChangeText={onChangeText}
      autoCapitalize='none'
      autoCorrect={false}
      autoFocus={autoFocus}
      keyboardType='email-address'
      returnKeyType='next'
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
