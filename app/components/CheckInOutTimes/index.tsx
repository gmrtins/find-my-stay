import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ICheckInOut } from '@/app/types';
import colors from '@/app/theme/colors';

interface ICheckInOutTimesProps {
    title: string;
    time: ICheckInOut;
}

export default function CheckInOutTimes(props: ICheckInOutTimesProps) {
    const { title, time } = props;

    return (
        <View style={styles.container}>
            <FontAwesome name='clock-o' size={24} color={colors.BLUE} />
            <View style={styles.labelsContainer}>
                <Text>{title}</Text>
                <Text style={styles.timeLabel}>{time.from + ' - ' + time.to}</Text>
            </View >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        alignContent: 'center',
    },
    labelsContainer: {},
    timeLabel: { fontWeight: 'bold' },
});
