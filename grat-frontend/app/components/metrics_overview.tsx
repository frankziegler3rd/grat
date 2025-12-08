/**
 * grat - senior project
 * metrics carousel
 *
 * @author frank ziegler
 * @version 1.0.0
 */

import { 
    View, 
    Text, 
    FlatList 
} from "react-native";

export default function MetricsOverview({ shifts, theme }) {
    
    const metricCounts = {};
    
    // metric aggregation
    shifts.forEach((shift) => {
        Object.entries(shift.metrics || {}).forEach(([key, value]) => {
            if (!metricCounts[key]) metricCounts[key] = {};
            metricCounts[key][value] = (metricCounts[key][value] || 0) + 1;
        });
    });

    // flatten metrics
    const metricsArray = Object.entries(metricCounts).map(([metricName, counts]) => ({
        metricName,
        counts,
    }));

    return (
        <FlatList
            horizontal
            data={metricsArray}
            keyExtractor={(item) => item.metricName}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16, paddingVertical: 8 }}
            renderItem={({ item }) => (
                <View
                    style={{
                        width: 180,
                        marginRight: 12,
                        padding: 16,
                        borderRadius: 12,
                        backgroundColor: theme.colors.surface,
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowRadius: 6,
                        elevation: 3,
                    }} >
                    <Text style={{ fontWeight: "bold", color: theme.colors.text, marginBottom: 8 }}>
                        {item.metricName}
                    </Text>
                    { Object.entries(item.counts).map(([value, count]) => (
                        <Text key={value} style={{ color: theme.colors.text }}>
                            {value}: {count}
                        </Text>
                    ))}
                </View>
            )} />
    );
}
