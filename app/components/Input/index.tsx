import colors from "@/app/theme/colors";
import { ReactNode } from "react";
import { View, StyleSheet, TextInput } from "react-native";

interface IInput {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  placeholder: string;
  onChange: (s: string) => void;
  value?: string;
  defaultValue?: string;
  secureTextEntry?: boolean;
}

export const Input = (props: IInput) => {
  const {
    leftIcon,
    rightIcon,
    placeholder,
    onChange,
    value,
    defaultValue,
    secureTextEntry,
  } = props;

  return (
    <View style={styles.container}>
      {leftIcon && leftIcon}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChange}
        placeholderTextColor={"#333333"}
        underlineColorAndroid="transparent"
        defaultValue={defaultValue}
        value={value}
        secureTextEntry={secureTextEntry}
      />
      {rightIcon && rightIcon}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 8,
    color: "black",
    backgroundColor: "white",
    fontFamily: "Poppins_400Regular",
  },
  input: {
    flex: 1,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
    fontFamily: "Poppins_400Regular",
  },
});
