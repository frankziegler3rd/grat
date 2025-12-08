/**
 * grat - senior project
 * home screen
 *
 * @author frank ziegler
 * @version 1.0.0
 */

import React, { 
    useState, 
    useEffect, 
    useCallback 
} from 'react';
import { 
    StyleSheet, 
    View, 
    ScrollView 
} from 'react-native';
import { 
    Button, 
    FAB, 
    Text, 
    useTheme 
} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    useRouter, 
    useFocusEffect 
} from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import Shift from "../components/shift";
import { baseURL } from "../../constants/api.ts";
import Header from "../components/header.tsx";

export default function Home() {

    const theme = useTheme();
    const router = useRouter();
    const [daySelected, setDaySelected] = useState('');
    
    // state var to manage the shift on a day press
    const [shiftsFTD, setShiftsFTD] = useState([]);

    // async function to retrieve shift when a calendar day is pressed by user
    const getShifts = async (dateString) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get(`${baseURL}/shifts/${dateString}`, {
                headers: { token }
            });
            setShiftsFTD(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    // handle day selection
    const handleDayPress = (day) => {
        setDaySelected(day.dateString);
        console.log(day.dateString);
        getShifts(day.dateString);
    }
    
    // effect for calling shifts when screen is in focus
    useFocusEffect(
        useCallback(() => {
            if(daySelected) {
                getShifts(daySelected);
            }
        }, [daySelected])
    );

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Header/>
            <View style={{ padding: 16 }}>
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
                        calendarBackground: theme.colors.background,
                        textSectionTitleColor: theme.colors.placeholder,
                        todayTextColor: theme.colors.secondary,
                        dayTextColor: theme.colors.onSurface,
                        selectedDayBackgroundColor: theme.colors.primary,
                        selectedDayTextColor: theme.colors.onPrimary,
                        arrowColor: theme.colors.primary,
                        textMonthFontSize: 22,
                        textMonthFontWeight: 'bold',
                        monthTextColor: theme.colors.secondary,
                    }}
                />
            </View>
            <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingTop: 0 }}>
                { shiftsFTD.map((shift, index) => (
                    <Shift
                        key={shift.id}
                        shift={shift}
                        onPress={() => router.push({pathname: "/modify_shift", params: { shift: JSON.stringify(shift) }})}
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
        borderRadius: 24,
    },
    fab: {
        position: "absolute",
        bottom: 24,
        right: 24,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});
