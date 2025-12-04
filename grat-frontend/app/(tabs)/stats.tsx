
import { View, Text, Dimensions, FlatList, ScrollView } from "react-native";
import Header from "../components/header.tsx";
import { baseURL } from "../../constants/api.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useTheme } from "react-native-paper";
import { useState, useEffect } from "react";
import { LineChart } from "react-native-chart-kit";

export default function Stats() {
    const theme = useTheme();
    const [shifts, setShifts] = useState([]);
    const screenWidth = Dimensions.get("window").width;

    useEffect(() => {
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
    }, []);

    const toLocalDateLabel = (iso) => {
        const [date] = iso.split("T");
        const [y, m, d] = date.split("-").map(Number);
        return `${m}/${d}`;
    };

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

    const calculateDailyTotal = () => {
        const today = new Date().toISOString().split("T")[0];
        return shifts
            .filter(s => s.clock_in?.split("T")[0] === today)
            .reduce((sum, s) => sum + s.cash_tips + s.card_tips, 0);
    };

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

    const calculateYearlyTotal = () => {
        const year = new Date().getFullYear();
        return shifts
            .filter(s => new Date(s.clock_in).getFullYear() === year)
            .reduce((sum, s) => sum + s.cash_tips + s.card_tips, 0);
    };

    const totals = [
        { title: "Daily Total", value: calculateDailyTotal() },
        { title: "Monthly Total", value: calculateMonthlyTotal() },
        { title: "Yearly Total", value: calculateYearlyTotal() },
    ];

    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Header />

            {/* Horizontal totals cards */}
            <FlatList
                horizontal
                data={totals}
                keyExtractor={(item) => item.title}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 16, paddingLeft: 16 }}
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
                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.colors.text }}>
                            {item.title}
                        </Text>
                        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 8, color: theme.colors.primary }}>
                            ${item.value}
                        </Text>
                    </View>
                )}
            />

            {/* Chart card */}
            {shifts.length > 0 ? (
                <FlatList
                    horizontal
                    data={[chartData]} // you can expand to multiple charts later
                    keyExtractor={(_, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    contentContainerStyle={{ paddingHorizontal: 16, marginVertical: 16 }}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                width: screenWidth - 32,
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
                                Daily Total
                            </Text>
                            <LineChart
                                data={item}
                                width={screenWidth - 64} // padding inside card
                                height={300}
                                withInnerLines={false}
                                yAxisLabel="$"
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
        </ScrollView>
    );
}
