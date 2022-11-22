import React, { FC } from "react";
import {
    KeyboardTypeOptions, StyleProp, StyleSheet, TextInput, TextStyle
} from "react-native";

export type TextboxProps = {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  style?: StyleProp<TextStyle>;
  password?: boolean;
};

const Textbox: FC<TextboxProps> = ({
  placeholder,
  value,
  style,
  onChangeText,
  keyboardType = "default",
  password
}) => {
  return (
    <TextInput
      keyboardType={keyboardType}
      placeholder={placeholder}
      defaultValue={value}
      style={[styles.textbox, style]}
      placeholderTextColor={"#626262"}
      onChangeText={onChangeText}
      secureTextEntry={password}
    />
  );
};

const styles = StyleSheet.create({
  textbox: {
    backgroundColor: "#ffffff",
    paddingVertical: 30,
    paddingLeft: 25,
    borderRadius: 4,
  },
});

export default Textbox;
