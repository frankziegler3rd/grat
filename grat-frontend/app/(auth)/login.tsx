/**
 * grat – senior project
 * login screen
 * 
 * @author frank ziegler
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { 
    View, 
    StyleSheet, 
    KeyboardAvoidingView, 
    Platform, 
    Text, 
    Keyboard, 
    TouchableWithoutFeedback 
} from "react-native";
import { 
    Button, 
    TextInput, 
    useTheme, 
    FAB 
} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { baseURL } from "../../constants/api.ts";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { 
    Path 
} from 'react-native-svg';
import GratIcon from '../../assets/grat1(2).svg';

export default function Login() {
    
    const theme = useTheme();
    const router = useRouter();

    // state vars for managing DTO state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // async function to send login request to api
    const handleLogin = () => {
        axios.post(`${baseURL}/user/login`, {
            email: email,
            rawPassword: password
        })
        .then(async response => {
            const token = response.data.token;
            try {
                await AsyncStorage.setItem("token", token);
                router.replace("/(tabs)/home");
            } catch(e) {
                console.error("failed to save token: ", e);
            }
        })
        .catch(error => {
            console.error("login failed: ", error.response?.data || error.message);
        });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView
                style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <GratIcon width={100} height={100} style={{ alignSelf: 'center', marginBottom: 16 }}/>
                <Text style={[styles.headerText, { textAlign: 'center', color: theme.colors.text}]}>
                    Welcome back
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 16, marginBottom: 16, color: theme.colors.placeholder }}>
                    Log in to access your account
                </Text>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    style={[styles.input, { backgroundColor: theme.colors.surface }]}
                    left={<TextInput.Icon icon="email" />}
                    placeholderTextColor={theme.colors.placeholder}
                    keyboardType="email-address"
                    autoCapitalize="none"/>
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    style={[styles.input, { backgroundColor: theme.colors.surface }]}
                    left={<TextInput.Icon icon="lock" />}
                    secureTextEntry
                    placeholderTextColor={theme.colors.placeholder}/>
                <Button
                    onPress={handleLogin}
                    style={[styles.button, { backgroundColor: theme.colors.primary }]}
                    labelStyle={{ color: theme.colors.onPrimary }}>
                    Login
                </Button>
                <Button
                    mode="text"
                    onPress={() => router.push('/forgot-password')}
                    contentStyle={{ paddingHorizontal: 0, paddingVertical: 8 }}
                    labelStyle={{ color: theme.colors.secondary, textDecorationLine: 'underline' }}>
                    Forgot password?
                </Button>
                <FAB
                    icon="arrow-left"
                    style={{
                        position: 'absolute',
                        top: 48,
                        left: 24,
                        backgroundColor: theme.colors.surface,
                        elevation: 4,
                    }}
                    small
                    onPress={() => router.back()}/>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 12,
    },
    input: {
        width: '100%',
        marginBottom: 16,
        borderRadius: 12,
    },
    button: {
        borderRadius: 12,
        marginTop: 16,
    },
});
