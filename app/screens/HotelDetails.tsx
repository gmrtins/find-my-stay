import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router'
import Carousel from 'react-native-reanimated-carousel';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Stars from '../components/Stars';
import { useTranslation } from 'react-i18next';
import { IHotel } from '../types';
import { getRatingMessage } from '../utils';
import React, { useContext, useMemo, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import CheckInOutTimes from '../components/CheckInOutTimes';
import { FavoritesContext } from '../contexts/FavoriteContext';
import colors from '../theme/colors';

export default function HotelDetails() {
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();
    const { favorites, add, remove } = useContext(FavoritesContext);
    const params = useLocalSearchParams();
    const hotel: IHotel = JSON.parse(Array.isArray(params.data) ? params.data[0] : params.data);
    const width = Dimensions.get('window').width;
    const PlaceholderImageUri = 'https://blocks.astratic.com/img/general-img-portrait.png'; // Replace this with your placeholder image URL

    const isFavorite = useMemo(() => favorites.includes(hotel.id), [favorites, hotel.id]);

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, maxHeight: 200 }}>
                <TouchableOpacity style={styles.favoriteBtn} onPress={() => isFavorite ? remove(hotel.id) : add(hotel.id)}>
                    <FontAwesome name={isFavorite ? "bookmark" : "bookmark-o"} size={20} color={colors.BLUE} />
                </TouchableOpacity>
                <Carousel
                    loop
                    width={width}
                    height={width / 2}
                    autoPlay={true}
                    data={hotel.gallery}
                    scrollAnimationDuration={1000}
                    renderItem={({ item }) => {
                        const [imageUri, setImageUri] = useState(item);
                        return (
                            <View>
                                <Image source={{ uri: imageUri as string }} onError={() => setImageUri(PlaceholderImageUri)} style={{ width: width, height: width / 2 }} resizeMode='cover' />
                            </View>);
                    }}
                    style={{ zIndex: -1 }} />

            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{hotel.name}</Text>
                <View style={styles.hotelStarsContainer}>
                    <Text>{t("hotel_details_hotel_label")}</Text>
                    <Stars rating={hotel.stars} />
                </View>
                <View style={styles.hoursContainer}>
                    <CheckInOutTimes title={t('hotel_details_checkin_label')} time={hotel.checkIn} />
                    <CheckInOutTimes title={t('hotel_details_checkout_label')} time={hotel.checkOut} />
                </View>

                <View style={styles.userRatingContainer}>
                    <Text style={styles.userRatingLabel}>{hotel.userRating}</Text>
                    <View style={styles.ratingContainer}>

                        <View style={styles.ratingMessageContainer}>
                            <View style={[styles.contactBtn, { width: 20, height: 20 }]}>
                                <FontAwesome name="thumbs-up" size={10} color="white" />
                            </View>
                            <Text style={styles.ratingMessageLabel1}>{getRatingMessage(hotel.userRating)}</Text>

                        </View>
                        <Text style={styles.ratingMessageLabel2}>{t('hotel_details_users_reviews_label')}</Text>

                    </View>

                </View>



                <View style={styles.addressContainer}>
                    <FontAwesome name="map-marker" size={25} color={colors.BLUE} />
                    <Text>{hotel.location.address + ' - ' + hotel.location.city}</Text>
                </View>


                {/* {hotel.contact.phoneNumber &&
                    <TouchableOpacity style={styles.contactBtn} onPress={() => Linking.openURL(`tel:${hotel.contact.phoneNumber}`)}>
                        <FontAwesome name="phone" size={20} color="white" />
                    </TouchableOpacity>}
                {hotel.contact.email &&
                    <TouchableOpacity style={styles.contactBtn} onPress={() => Linking.openURL(`mailto:${hotel.contact.email}`)}>
                        <FontAwesome name="envelope" size={20} color="white" />
                    </TouchableOpacity>} */}

                <MapView style={styles.map}
                    initialRegion={{
                        latitude: hotel.location.latitude,
                        longitude: hotel.location.longitude,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.002,
                    }}
                    onMapReady={() => { setIsLoading(false); }}


                >
                    <Marker coordinate={{ latitude: hotel.location.latitude, longitude: hotel.location.longitude }} />
                </MapView>
            </View>


        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoContainer: {
        marginTop: -20,
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        gap: 16

    },
    title: {
        fontSize: 16,

    },
    hotelStarsContainer: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: '#F0F8FF', paddingHorizontal: 8, paddingVertical: 4, gap: 5, borderRadius: 16 },
    addressContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    contactBtn: { backgroundColor: colors.BLUE, borderRadius: 100, width: 35, height: 35, alignItems: 'center', justifyContent: 'center' },
    hoursContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
    userRatingLabel: { fontSize: 32, fontWeight: 'bold', color: colors.BLUE },
    ratingMessageLabel1: { fontSize: 14, fontWeight: 'bold', color: colors.BLUE },
    ratingMessageLabel2: { fontSize: 12, color: '#808089' },
    userRatingContainer: { flexDirection: 'row', gap: 8, alignItems: 'center' },
    ratingContainer: { flexDirection: 'column' },
    ratingMessageContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    map: { width: '100%', height: 200, borderRadius: 16 },
    favoriteBtn: { position: 'absolute', right: 16, top: 16, backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 100 },

});
