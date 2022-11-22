import React, { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

export type ButtonProps = {
  style: StyleProp<ViewStyle>;
  text: string;
  onPress: () => void;
};

const Button: FC<ButtonProps> = ({ style, text, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={() => onPress()}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#23A2D1",
    paddingVertical: 30,
    borderRadius: 4,
  },
  text: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },
});

export default Button;
