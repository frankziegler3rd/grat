/**
 * grat - senior project
 * home screen (req. auth)
 *
 * @author frank ziegler
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, FAB, Text, useTheme } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import Shift from "../components/shift";
import { baseURL } from "../../constants/api.ts";
import Header from "../components/header.tsx";

interface HomeProps {
    shiftsFTD: any[];
    daySelected: string;
    handleDayPress: (day: any) => void;
}

export default function Home() {

    const theme = useTheme();
    const router = useRouter();
    const [daySelected, setDaySelected] = useState('');
    const [shiftsFTD, setShiftsFTD] = useState([]);

    const handleDayPress = async (day) => {
        setDaySelected(day.dateString);
        console.log(day.dateString);
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get(`${baseURL}/shifts/${day.dateString}`, {
                headers: { token }
            });
            setShiftsFTD(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Header/>
            <View style={{ padding: 16 }}>
                
                <View style={{ alignItems: "center", marginBottom: 16 }}>
                    <Text style={{ fontSize: 32, fontWeight: "700", color: theme.colors.text }}>
                        Welcome back 👋
                    </Text>
                    <Text style={{ fontSize: 16, marginTop: 4, color: theme.colors.placeholder }}>
                        pick a day, add a shift
                    </Text>
                </View>
                <Calendar
                    onDayPress={handleDayPress}
                    markedDates={{
                        [daySelected]: {
                            selected: true, 
                            disableTouchEvent: true, 
                            selectedDotColor: 'orange',
                            selectedColor: "#7ed957",
                        }
                    }}
                    style={styles.calendar} 
                    
                    theme={{
                        calendarBackground: theme.colors.surface,
                        textSectionTitleColor: theme.colors.placeholder,
                        todayTextColor: theme.colors.secondary,
                        dayTextColor: theme.colors.onSurface,
                        selectedDayBackgroundColor: theme.colors.primary,
                        selectedDayTextColor: theme.colors.onPrimary,
                        arrowColor: theme.colors.primary,
                        textMonthFontSize: 22,
                        textMonthFontWeight: 'bold',
                    }}
                />
            </View>
            <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingTop: 0 }}>
                { shiftsFTD.map((shift, index) => (
                    <Shift
                        key={shift.id}
                        shift={shift}
                        onPress={() => router.push({pathname: "/shift_modal", params: { shift: JSON.stringify(shift) }})}
                    />
                ))} 
            </ScrollView>
            <FAB 
                icon="plus"
                onPress={() => router.push({
                    pathname: "/new_shift",
                    params: { 
                        date: daySelected 
                    }
                })}
                style={[styles.fab, { backgroundColor: theme.colors.primary }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    calendar: { 
        height: 364, 
        borderRadius: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    fab: {
        position: "absolute",
        bottom: 24,
        right: 24,
    },
});
