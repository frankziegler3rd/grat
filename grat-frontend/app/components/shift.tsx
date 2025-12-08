/**
 * grat - senior project
 * tappable shift component
 *
 * @author frank ziegler
 * @version 1.0.0
 */

import { 
    View, 
    Text, 
    Pressable 
} from "react-native";
import { useTheme } from "react-native-paper";

export default function Shift({ shift, onPress, showDate }) {
    
    const theme = useTheme();
    const totalTips = shift.cash_tips + shift.card_tips;

    return (
        <Pressable
            onPress={onPress}
            style={{
                backgroundColor: theme.colors.surface,
                padding: 16,
                marginVertical: 8,
                borderRadius: 18,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 10,
                elevation: 3,
            }} >
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "700",
                    color: theme.colors.onSurface,
                    marginBottom: 6,
                }}
                numberOfLines={1}>
                {shift.position}, {shift.location}
            </Text>
            { showDate && (
                <Text
                    style={{
                        fontSize: 14,
                        color: theme.colors.onSurfaceVariant,
                        marginBottom: 10,
                    }} >
                    📅 {shift.clock_in.substring(0, 10)}
                </Text>
            )}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }} >
                <Text
                    style={{
                        fontSize: 15,
                        color: theme.colors.onSurfaceVariant,
                    }}>
                    ⏰ {shift.clock_in.substring(11, 16)} — {shift.clock_out.substring(11, 16)}
                </Text>
                <View
                    style={{
                        backgroundColor: theme.colors.primary + "22",
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 8,
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "700",
                            color: theme.colors.primary,
                        }}>
                        💰 {totalTips}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}
