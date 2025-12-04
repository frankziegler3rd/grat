
import { View, Text, Dimensions, ScrollView } from "react-native";
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
                color: () => theme.colors.primary, // line color
                strokeWidth: 2,
            },
        ],
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}> 
            <Header />
            {shifts.length > 0 ? (
                <LineChart
                    data={chartData}
                    width={screenWidth - 32}
                    height={300}
                    yAxisLabel="$"
                    chartConfig={{
                        backgroundColor: theme.colors.background,
                        backgroundGradientFrom: theme.colors.background,
                        backgroundGradientTo: theme.colors.background,
                        decimalPlaces: 0,
                        color: (opacity = 1) => theme.colors.primary,
                        labelColor: (opacity = 1) => theme.colors.text,
                        style: { borderRadius: 16 },
                        propsForDots: { r: "4", strokeWidth: "2", stroke: theme.colors.primary },
                    }}
                    style={{ marginVertical: 16, borderRadius: 16, marginHorizontal: 16 }}/>
            ) : (
                <Text style={{ textAlign: "center", marginTop: 50 }}>Loading chart...</Text>
        )} 
        </ScrollView>
    );
}
