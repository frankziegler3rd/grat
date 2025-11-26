/**
 * grat - senior project
 * profile screen (req. auth)
 *
 * @author frank ziegler
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { baseURL } from "../../constants/api.ts";

export default function Profile() {
    
    const router = useRouter();

    const ping = async () => {
        console.log(baseURL);
        try {

            const response = await axios.get(`${baseURL}/user/ping`);
            console.log(response.data);
        } catch (error: any) {
            console.log(error.response?.data);
        }
    }

    const handleLogout = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                try {
                    await axios.post(`${baseURL}/user/logout`, null, {
                        headers: { token },
                    });
                } catch (error: any) {
                    const msg = error.response?.data;
                    
                    // ignore "no session exists"
                    if (msg !== "No session with this token exists.") {
                        throw error;
                    }
                }
            }
            await AsyncStorage.clear();
            router.replace("/(auth)/onboard");
        } catch (error: any) {
            console.error("logout failed:", error.response?.data || error.message);
        }
    };

    return (
            <View style={{ flex: 1, padding: 16 }}>
                <Text>Profile Screen</Text>
                <Button mode="contained" onPress={handleLogout}>Logout</Button>
                <Button mode="contained" onPress={ping}>Ping</Button>
            </View>
    );
}
