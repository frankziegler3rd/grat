/**
 * grat - senior project
 * stats screen
 *
 * @author frank ziegler
 * @version 1.0.0
 */

import { 
    View, 
    Text, 
    Dimensions, 
    FlatList, 
    ScrollView, 
    StyleSheet, 
    Pressable 
} from "react-native";
import Header from "../components/header.tsx";
import { baseURL } from "../../constants/api.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import { useTheme } from "react-native-paper";
import { 
    useState, 
    useEffect, 
    useCallback 
} from "react";
import { LineChart } from "react-native-chart-kit";
import MetricsOverview from "../components/metrics_overview.tsx";

export default function Stats() {
    
    const theme = useTheme();
    
    // state var to manage shift objects
    const [shifts, setShifts] = useState([]);
    
    const screenWidth = Dimensions.get("window").width;

    // focused effect to call shifts when screen is in focus
    useFocusEffect(
        useCallback(() => {
            const getShifts = async () => {
                try {
                    const token = await AsyncStorage.getItem("token");
                    const response = await axios.get(`${baseURL}/shifts/all`, {
                        headers: { token },
                    });
                    setShifts(response.data);
                } catch (error) {
                    console.error(error);
                }
            };
            getShifts();
        }, [])
    );

    // format date for DD/MM
    const toLocalDateLabel = (iso) => {
        const [date] = iso.split("T");
        const [y, m, d] = date.split("-").map(Number);
        return `${m}/${d}`;
    };

    // format shifts into chart data necessary for chart component
    const chartData = {
        labels: shifts.map((s) => toLocalDateLabel(s.clock_in)),
        datasets: [
            {
                data: shifts.map((s) => s.cash_tips + s.card_tips),
                color: () => theme.colors.primary,
                strokeWidth: 2,
            },
        ],
    };

    // calculate $ made for the day
    const calculateDailyTotal = () => {
        const today = new Date().toISOString().split("T")[0];
        return shifts
            .filter(s => s.clock_in?.split("T")[0] === today)
            .reduce((sum, s) => sum + s.cash_tips + s.card_tips, 0);
    };

    // calculate $ made for the month
    const calculateMonthlyTotal = () => {
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();
        return shifts
            .filter(s => {
                const d = new Date(s.clock_in);
                return d.getMonth() === month && d.getFullYear() === year;
            })
            .reduce((sum, s) => sum + s.cash_tips + s.card_tips, 0);
    };

    // calculate $ made for the year
    const calculateYearlyTotal = () => {
        const year = new Date().getFullYear();
        return shifts
            .filter(s => new Date(s.clock_in).getFullYear() === year)
            .reduce((sum, s) => sum + s.cash_tips + s.card_tips, 0);
    };

    // "total" objects
    const totals = [
        { title: "Daily Total", value: calculateDailyTotal() },
        { title: "Monthly Total", value: calculateMonthlyTotal() },
        { title: "Yearly Total", value: calculateYearlyTotal() },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Header />

            <ScrollView style={{ flex: 1, paddingTop: 4 }}>  
                <Text style={[ styles.headerText, { color: theme.colors.text }]}>Averages</Text>
                <FlatList
                    horizontal
                    data={totals}
                    keyExtractor={(item) => item.title}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 8, paddingLeft: 16 }}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                backgroundColor: theme.colors.surface,
                                padding: 16,
                                borderRadius: 12,
                                marginRight: 12,
                                width: 150,
                                shadowColor: "#000",
                                shadowOpacity: 0.1,
                                shadowRadius: 6,
                                elevation: 3,
                            }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.colors.text }}>
                                {item.title}
                            </Text>
                            <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 8, color: theme.colors.primary }}>
                                ${item.value}
                            </Text>
                        </View>
                    )}
                />
                <Text style={[ styles.headerText, { color: theme.colors.text } ]}>Charts</Text>
                { shifts.length > 0 ? (
                    <FlatList
                        horizontal
                        data={[chartData]}
                        keyExtractor={(_, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        contentContainerStyle={{ paddingHorizontal: 16, marginVertical: 4 }}
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    backgroundColor: theme.colors.surface,
                                    borderRadius: 16,
                                    padding: 16,
                                    shadowColor: "#000",
                                    shadowOpacity: 0.1,
                                    shadowRadius: 6,
                                    elevation: 3,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        color: theme.colors.text,
                                        marginBottom: 8,
                                        textAlign: "center",
                                    }}>
                                    Tips Over Time
                                </Text>
                                <LineChart
                                    data={item}
                                    width={screenWidth - 64} 
                                    height={300}
                                    yAxisLabel="$"
                                    withInnerLines={false}
                                    chartConfig={{
                                        backgroundColor: theme.colors.surface,
                                        backgroundGradientFrom: theme.colors.surface,
                                        backgroundGradientTo: theme.colors.surface,
                                        decimalPlaces: 0,
                                        color: (opacity = 1) => theme.colors.primary,
                                        labelColor: (opacity = 1) => theme.colors.text,
                                        style: { borderRadius: 16 },
                                        propsForDots: { r: "4", strokeWidth: "2", stroke: theme.colors.primary },
                                    }}
                                    style={{ borderRadius: 16 }}
                                />
                            </View>
                        )}
                    />
                ) : (
                    <Text style={{ textAlign: "center", marginTop: 50 }}>Loading chart...</Text>
                )}
                { shifts.length > 0 && (
                    <View style={{ paddingBottom: 32 }}>
                        <Text style={[styles.headerText, { color: theme.colors.text } ]}>Metrics</Text>
                        <MetricsOverview shifts={shifts} theme={theme} />
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 18,
        fontWeight: "600",
        paddingLeft: 16,
        marginTop: 20,
        marginBottom: 8,
    },
});
