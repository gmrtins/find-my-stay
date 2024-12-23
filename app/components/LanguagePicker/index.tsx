import colors from "@/app/theme/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface ILanguagePicker {
  selectedLanguage: string;
  setSelectedLanguage: (s: string) => void;
  applyLanguage: () => void;
}

const LanguagePicker = ({
  selectedLanguage,
  setSelectedLanguage,
  applyLanguage,
}: ILanguagePicker) => {
  const { t } = useTranslation();

  return (
    <View style={{ gap: 16 }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setSelectedLanguage("pt-PT")}
        >
          <Text style={styles.menuText}>🇵🇹 Português</Text>
          {selectedLanguage === "pt-PT" && (
            <FontAwesome size={16} name="check" color={colors.BLUE} />
          )}
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setSelectedLanguage("en-GB")}
        >
          <Text style={styles.menuText}>🇬🇧 English</Text>
          {selectedLanguage === "en-GB" && (
            <FontAwesome size={16} name="check" color={colors.BLUE} />
          )}
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setSelectedLanguage("es-ES")}
        >
          <Text style={styles.menuText}>🇪🇸 Español</Text>
          {selectedLanguage === "es-ES" && (
            <FontAwesome size={16} name="check" color={colors.BLUE} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          applyLanguage();
        }}
      >
        <Text style={styles.saveButtonText}>{t("save_btn")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  menuText: {
    fontSize: 16,
    color: "#333333",
    fontFamily: "Poppins_600SemiBold",
  },
  divider: {
    backgroundColor: "#f2f2f2",
    width: "100%",
    height: 1,
  },
  saveButton: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#333333",
  },
});

export default LanguagePicker;