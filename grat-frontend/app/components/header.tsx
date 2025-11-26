import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Svg, { Path } from 'react-native-svg';
import GratIcon from '../../assets/grat1(2).svg';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Header() {
    const theme = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            <GratIcon width={60} height={60} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 112,
        paddingHorizontal: 16,
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
});
