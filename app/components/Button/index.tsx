import { ReactNode } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface IButton {
  text: string;
  onPress: () => void;
  type?: "primary" | "secondary";
  icon?: ReactNode;
}

export const Button = (props: IButton) => {
  const { type, text, onPress, icon } = props;

  return (
    <TouchableOpacity
      style={type === "secondary" ? styles.secondaryBtn : styles.primaryBtn}
      onPress={onPress}
    >
      {icon && icon}
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryBtn: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    gap: 4,
  },
  secondaryBtn: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    gap: 4,
  },
  buttonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#1A94FF",
  },
});
