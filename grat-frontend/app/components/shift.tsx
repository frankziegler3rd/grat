/**
 * grat - senior project
 * tappable shift component (req. auth)
 *
 * @author frank ziegler
 * @version 1.0.0
 */


import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from 'react-native-paper';


export default function Shift({ shift, onPress, showDate }) {
    const theme = useTheme();

    return (
        <Pressable
            style={{
                backgroundColor: theme.colors.surface,
                padding: 16,
                marginVertical: 4,
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
            }}
            onPress={onPress}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: 28, color: theme.colors.onSurface, fontWeight: "600", marginBottom: 4 }}>
                    {shift.position} @ {shift.location}
                </Text>
            </View>
            { showDate && ( 
                <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: 8 }}>
                    📅 {shift.clock_in.substring(0, 10)}
                </Text>
            )}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: 16, color: theme.colors.placeholder, fontWeight: "500" }}>
                    ⏰ {shift.clock_in.substring(11,16)} - {shift.clock_out.substring(11,16)}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "600", color: theme.colors.primary }}>
                    💰 {shift.cash_tips + shift.card_tips}
                </Text>
            </View>
        </Pressable>
    );
}
