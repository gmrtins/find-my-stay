import { IHotel } from "@/app/types";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { getCurrencySymbol } from "@/app/utils";
import colors from "@/app/theme/colors";

interface IListItemProps {
  item: IHotel;
  index: number;
}

export default function ListItem(props: IListItemProps) {
  const { item, index } = props;
  const [img, setImg] = useState(item.gallery[0]);

  const { t } = useTranslation();

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <FontAwesome key={i} size={16} name="star" color={colors.YELLOW} />
      );
    }
    return stars;
  };
  return (
    <TouchableOpacity
      style={[styles.container, index === 0 && { marginTop: 8 }]}
      onPress={() =>
        router.push({
          pathname: "/screens/HotelDetails",
          params: { data: JSON.stringify(item), name: item.name },
        })
      }
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image
          source={{ uri: img }}
          onError={() =>
            setImg("https://blocks.astratic.com/img/general-img-portrait.png")
          }
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={[styles.rowContainer, { marginBottom: 5 }]}>
            {renderStars(item.stars)}
          </View>
          {/* <View style={styles.rowContainer}>
                        <FontAwesome size={16} name="thumbs-o-up" color={"#F2007E"} />
                        <Text style={styles.title}>{item.userRating}</Text>
                    </View> */}

          <View style={[styles.rowContainer, { alignItems: "flex-end" }]}>
            <Text
              style={[
                styles.body,
                { fontSize: 18, fontWeight: "bold", color: colors.BLUE },
              ]}
            >
              {item.price + " " + getCurrencySymbol(item.currency)}
            </Text>
            <Text
              style={[
                styles.body,
                { fontSize: 10, fontWeight: "light", marginBottom: 2 },
              ]}
            >
              {t("per_night_tag")}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 16,
          paddingVertical: 4,
          borderRadius: 4,
          paddingHorizontal: 8,
        }}
      >
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <FontAwesome size={10} name="map-o" color={colors.BLUE} />
          <Text style={{ fontSize: 10 }}>{item.location.city}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <FontAwesome size={10} name="thumbs-o-up" color={colors.BLUE} />
          <Text style={{ fontSize: 10 }}>{item.userRating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 5,
    flexDirection: "column",
    gap: 8,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    wordWrap: "break-word",
    width: "100%",
  },
  body: {
    fontSize: 14,
    color: "#555",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 16,
  },
  rowContainer: { flexDirection: "row", gap: 5 },
  image: { width: 75, height: 75, borderRadius: 12 },
});
