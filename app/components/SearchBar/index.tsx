import colors from "@/app/theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { t } from "i18next";
import React, { ForwardedRef } from "react";
import {
  Keyboard,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

interface ISearchBar {
  search: string;
  setSearch: (s: string) => void;
  isFiltersVisible: boolean;
  sheetRef: any;
}

export const SearchBar = ({
  search,
  setSearch,
  isFiltersVisible,
  sheetRef,
}: ISearchBar) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={colors.BLUE} />
        <TextInput
          style={styles.input}
          placeholder={t("homepage_search_placeholder")}
          onChangeText={(text) => setSearch(text)}
          placeholderTextColor={"#333333"}
          underlineColorAndroid="transparent"
          defaultValue={search}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Entypo name="cross" size={20} color={colors.BLUE} />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={styles.filtersBtn}
        onPress={() => {
          Keyboard.dismiss();

          isFiltersVisible
            ? sheetRef.current?.close()
            : sheetRef.current?.expand();
        }}
      >
        <Ionicons name="filter" size={20} color={colors.BLUE} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    height: 40,
    borderRadius: 8,
    color: "black",
    backgroundColor: "white",
    paddingHorizontal: 8,
    fontFamily: "Poppins_400Regular",
  },
  filtersBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
    fontFamily: "Poppins_400Regular",
  },
});
