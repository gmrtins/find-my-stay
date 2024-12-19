import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router'
import Carousel from 'react-native-reanimated-carousel';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Stars from '../components/Stars';
import { useTranslation } from 'react-i18next';
import { IHotel } from '../types';
import { getRatingMessage } from '../utils';

export default function HotelDetails() {
    const params = useLocalSearchParams();
    const hotel: IHotel = JSON.parse(Array.isArray(params.data) ? params.data[0] : params.data);
    const width = Dimensions.get('window').width;
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, maxHeight: 200 }}>
                <Carousel
                    loop
                    width={width}
                    height={width / 2}
                    autoPlay={true}
                    data={hotel.gallery}
                    scrollAnimationDuration={1000}
                    renderItem={({ item }) => (
                        <View style={{ backgroundColor: "blue" }}>
                            <Image source={{ uri: item as string }} style={{ width: width, height: width / 2 }} resizeMode='cover' />
                        </View>
                    )}
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{hotel.name}</Text>
                <View style={styles.hotelStarsContainer}>
                    <Text>{t("hotel_details_hotel_label")}</Text>
                    <Stars rating={hotel.stars} />
                </View>
                <View style={styles.addressContainer}>
                    <FontAwesome name="map-marker" size={25} color="#1A94FF" />
                    <Text>{hotel.location.address + ' - ' + hotel.location.city}</Text>
                </View>
                <View style={styles.hoursContainer}>
                    <Text>{hotel.checkIn.from + ' ' + hotel.checkIn.to}</Text>
                    <Text>{hotel.checkOut.from + ' ' + hotel.checkOut.to}</Text>

                </View>

                <View style={styles.userRatingContainer}>
                    <Text style={styles.userRatingLabel}>{hotel.userRating}</Text>
                    <View style={styles.ratingContainer}>

                        <View style={styles.ratingMessageContainer}>
                            <View style={[styles.contactBtn, { width: 20, height: 20 }]} >
                                <FontAwesome name="thumbs-up" size={10} color="white" />
                            </View>
                            <Text style={styles.ratingMessageLabel1}>{getRatingMessage(hotel.userRating)}</Text>

                        </View>
                        <Text style={styles.ratingMessageLabel2}>{t('hotel_details_users_reviews_label')}</Text>

                    </View>

                </View>
                {hotel.contact.phoneNumber &&
                    <TouchableOpacity style={styles.contactBtn} onPress={() => Linking.openURL(`tel:${hotel.contact.phoneNumber}`)}>
                        <FontAwesome name="phone" size={20} color="white" />
                    </TouchableOpacity>
                }
                {hotel.contact.email &&
                    <TouchableOpacity style={styles.contactBtn} onPress={() => Linking.openURL(`mailto:${hotel.contact.email}`)}>
                        <FontAwesome name="envelope" size={20} color="white" />
                    </TouchableOpacity>
                }

            </View>
        </View>
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
    contactBtn: { backgroundColor: '#1A94FF', borderRadius: 100, width: 35, height: 35, alignItems: 'center', justifyContent: 'center' },
    hoursContainer: {},
    userRatingLabel: { fontSize: 32, fontWeight: 'bold', color: '#1A94FF' },
    ratingMessageLabel1: { fontSize: 14, fontWeight: 'bold', color: '#1A94FF' },
    ratingMessageLabel2: { fontSize: 12, color: '#808089' },
    userRatingContainer: { flexDirection: 'row', gap: 8, alignItems: 'center' },
    ratingContainer: { flexDirection: 'column' },
    ratingMessageContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 }

});
