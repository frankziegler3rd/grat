/**
 * grat - senior project
 * new shift modal form
 *
 * @author frank ziegler
 * @version 1.0.0
 */

import { 
    useLocalSearchParams, 
    useRouter 
} from 'expo-router';
import { 
    ScrollView, 
    StyleSheet, 
    View 
} from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { 
    TextInput, 
    Button, 
    Text, 
    useTheme, 
    Card 
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from "../constants/api.ts";

export default function NewShift() {
    
    const theme = useTheme();
    const { date } = useLocalSearchParams();
    const router = useRouter();
    const shiftDate = date ? createLocalDate(date as string) : new Date();
    
    // state vars to manage DTO state
    const [position, setPosition] = useState("");
    const [wlocation, setWLocation] = useState("");
    const [clockIn, setClockIn] = useState(shiftDate);
    const [clockOut, setClockOut] = useState(shiftDate);
    const [cardTips, setCardTips] = useState("");
    const [cashTips, setCashTips] = useState("");
    const [showMetricForm, setShowMetricForm] = useState(false);
    const [metrics, setMetrics] = useState<{ name: string, value: string }[]>([]);
    const [newMetricName, setNewMetricName] = useState("");
    const [newMetricValue, setNewMetricValue] = useState("");

    // create local date (without time) from date string
    function createLocalDate(dateString) { 
        const [year, month, day] = dateString.split("-").map(Number); 
        return new Date(year, month - 1, day, 0, 0, 0); 
    }

    // format local date for backend
    const formatLocalDate = (date: Date) => { 
        if (!date) return ""; 
        const pad = (n: number, len = 2) => n.toString().padStart(len, "0"); 
        return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}`; 
    };

    // add new metric to dynamic metrics list
    const addNewMetric = () => {
        if (!newMetricName) return;
        setMetrics(prev => [...prev, { name: newMetricName, value: newMetricValue }]);
        setNewMetricName("");
        setNewMetricValue("");
        setShowMetricForm(false);
    };

    // async function to submit a new shift to the api
    const submitShift = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const clockInStr = formatLocalDate(clockIn);
            const clockOutStr = formatLocalDate(clockOut);
            
            if (!token) return;

            await axios.post(
                `${baseURL}/shifts/add`,
                {
                    position,
                    location: wlocation,
                    clock_in: clockInStr,
                    clock_out: clockOutStr,
                    card_tips: parseFloat(cardTips) || 0,
                    cash_tips: parseFloat(cashTips) || 0,
                    metrics: metrics.reduce((acc, m) => ({ ...acc, [m.name]: m.value }), {}),
                },
                    { headers: { Authorization: `Bearer ${token}` } }
            );
            router.back();
        } catch (e: any) {
            console.error("Failed to submit shift:", e.response?.data || e.message);
        }
    };

    // defined styles here so that theming would be easier
    const styles = StyleSheet.create({
        dateHeader: {
            fontSize: 20,
            fontWeight: '700',
            marginBottom: 12,
            color: theme.colors.text,
            textAlign: 'center',
        },
        card: {
            borderRadius: 16,
            padding: 16,
            backgroundColor: theme.colors.surface,
        },
        input: {
            marginBottom: 12,
            backgroundColor: theme.colors.background,
        },
        clockRow: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 8,
        },
        clockCol: {
            flex: 1,
            alignItems: 'center',
        },
        clockLabel: {
            marginBottom: 4,
            fontSize: 14,
            color: theme.colors.placeholder,
        },
    });

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: theme.colors.background }}
            contentContainerStyle={{ padding: 16 }}
            keyboardShouldPersistTaps="handled">    
            <View style={{ marginBottom: 16, alignItems: 'center' }}>
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: '700',
                        color: theme.colors.onSurface,
                        marginBottom: 2,
                    }}>
                    New Shift Entry
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: '500',
                        color: theme.colors.onSurfaceVariant,
                    }}>      
                    {shiftDate.toDateString()}
                </Text>
            </View>
            <Card style={styles.card}>
                <Card.Content>
                    <TextInput
                        label="Position"
                        value={position}
                        onChangeText={setPosition}
                        mode="outlined"
                        style={styles.input}
                        left={<TextInput.Icon icon="badge-account" />} />
                    <TextInput
                        label="Location"
                        value={wlocation}
                        onChangeText={setWLocation}
                        mode="outlined"
                        style={styles.input}
                        left={<TextInput.Icon icon="store" />} />
                    <View style={styles.clockRow}>
                        <View style={styles.clockCol}>
                            <Text style={styles.clockLabel}>Clock In</Text>
                            <DateTimePicker
                                mode="time"
                                value={clockIn}
                                onChange={(e, d) => d && setClockIn(d)}/>
                        </View>
                        <View style={styles.clockCol}>
                            <Text style={styles.clockLabel}>Clock Out</Text>
                            <DateTimePicker
                                mode="time"
                                value={clockOut}
                                onChange={(e, d) => d && setClockOut(d)}/>
                        </View>
                    </View>
                    <TextInput
                        label="Card Tips"
                        value={cardTips}
                        onChangeText={setCardTips}
                        keyboardType="decimal-pad"
                        mode="outlined"
                        style={styles.input}
                        left={<TextInput.Icon icon="card-plus" />}/>
                    <TextInput
                        label="Cash Tips"
                        value={cashTips}
                        onChangeText={setCashTips}
                        keyboardType="decimal-pad"
                        mode="outlined"
                        style={styles.input}
                        left={<TextInput.Icon icon="cash" />}/>
                    <Button
                        mode="contained"
                        onPress={() => setShowMetricForm(true)}
                        style={{ marginVertical: 8, borderRadius: 8 }}>
                        + Add Metric
                    </Button>
                    { showMetricForm && (
                        <View style={{ marginBottom: 12 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                                <TextInput
                                    placeholder="Metric Name"
                                    value={newMetricName}
                                    onChangeText={setNewMetricName}
                                    mode="flat"
                                    style={{ flex: 1, marginRight: 8, backgroundColor: 'transparent' }}/>
                                <TextInput
                                    placeholder="Metric Value"
                                    value={newMetricValue}
                                    onChangeText={setNewMetricValue}
                                    mode="flat"
                                    style={{ flex: 1, backgroundColor: 'transparent' }}/>
                                <Button
                                    icon="plus"
                                    mode="text"
                                    compact
                                    onPress={addNewMetric}
                                    style={{ marginLeft: 12 }}/>
                                <Button
                                    mode="text"
                                    icon="cancel"
                                    onPress={() => setShowMetricForm(false)}
                                    compact
                                    style={{ marginLeft: 4 }}/> 
                            </View>
                        </View>
                    )}
                    {metrics.map((metric, index) => (
                        <View
                            key={index}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 8
                                }}>
                            <TextInput
                                placeholder="Metric Name"
                                value={metric.name}
                                onChangeText={text => {
                                    const copy = [...metrics];
                                    copy[index].name = text;
                                    setMetrics(copy);
                                }}
                                mode="flat"
                                style={{ flex: 1, marginRight: 8, backgroundColor: 'transparent' }}/>
                            <TextInput
                                placeholder="Metric Value"
                                value={metric.value}
                                onChangeText={text => {
                                    const copy = [...metrics];
                                    copy[index].value = text;
                                    setMetrics(copy);
                                }}
                                mode="flat"
                                style={{ flex: 1, backgroundColor: 'transparent' }}/>
                            <Button
                                icon="trash-can-outline"
                                mode="text"
                                compact
                                onPress={() => {
                                    const copy = metrics.filter((_, i) => i !== index);
                                    setMetrics(copy);
                                }}
                                style={{ marginLeft: 8 }}/>
                        </View>
                    ))}
                    <Button
                        mode="contained"
                        onPress={submitShift}
                        style={{ marginTop: 16, borderRadius: 8 }}>
                        
                        Submit Shift
                    </Button>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}
