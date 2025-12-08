/**
 * grat - senior project
 * profile screen (req. auth)
 *
 * @author frank ziegler
 * @version 1.0.0
 */

import React, { 
    useState, 
    useEffect, 
    useCallback 
} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { 
    useTheme, 
    Searchbar 
} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    useRouter, 
    useFocusEffect 
} from 'expo-router';
import Header from '../components/header.tsx';
import Shift from '../components/shift.tsx';
import { baseURL } from '../../constants/api.ts';

export default function History() {
    
    const router = useRouter();
    const theme = useTheme();

    // stores data retrieved from backend
    const [shifts, setShifts] = useState<any[] | null>(null);

    // hook to call shifts in and store them when the screen comes into "focus"
    useFocusEffect(
        useCallback(() => {
            const getAllShifts = async () => {
                try {
                    const token = await AsyncStorage.getItem('token');
                    if (token) {
                        const response = await axios.get(`${baseURL}/shifts/all`, {
                            headers: { token },
                        });
                        setShifts(response.data || []);
                    } else {
                        setShifts([]);
                    }
                } catch (error) {
                    console.error(error);
                    setShifts([]);
                }
            };

            getAllShifts();
        }, [])
    );
    
    // if retrieval fails display a loading screen
    if (shifts === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}> 
                <Text>Loading shifts...</Text> 
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Header />
            { shifts.length === 0 ? (  
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>  
                    <Text>No shifts found.</Text>  
                </View>  
            ) : (  
                <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingTop: 4 }}>  
                    
                    { shifts.map((shift) => (  
                        <Shift  
                            key={shift.id}  
                            shift={shift}
                            onPress={() => router.push({ pathname: '/modify_shift', params: { shift: JSON.stringify(shift) } })} 
                            showDate={true}/>
                    ))}  
                </ScrollView>  
            )}  
        </View>  
    );
}
