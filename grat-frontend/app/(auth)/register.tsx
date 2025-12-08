/**
 * grat - senior project
 * register screen
 *
 * @author frank ziegler
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    Keyboard 
} from "react-native";
import { 
    Button, 
    TextInput, 
    useTheme, 
    FAB, 
    Text 
} from 'react-native-paper';
import axios from 'axios';
import { baseURL } from "../../constants/api.ts";
import { SafeAreaView } from "react-native-safe-area-context";
import { darkTheme } from "../../theme.tsx";
import { useRouter } from 'expo-router';
import GratIcon from '../../assets/grat1(2).svg';

export default function Register() {
    
    const theme = useTheme();
    const router = useRouter();
    
    // state vars for managing DTO state
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [rawPassword, setRawPassword] = useState("");
    
    // async function to handle sending registration to requests to the API
    const handleRegister = () => {
        axios.post(`${baseURL}/user/register`, {
            fname: fName,
            lname: lName,
            email: email,
            hpass: rawPassword
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error.response.data);
        })
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <GratIcon width={80} height={80} style={{ alignSelf: 'center', marginBottom: 16 }}/>
                <Text style={[styles.headerText, { textAlign: 'center', color: theme.colors.text }]}>
                    Create Account
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 16, marginBottom: 16, color: theme.colors.placeholder }}>
                    Register to start managing your shifts
                </Text>
                <TextInput
                    label="First name"
                    value={fName}
                    onChangeText={setFName}
                    mode="outlined"
                    style={[styles.input, { backgroundColor: theme.colors.surface }]}
                    left={<TextInput.Icon icon="account" />}/>
                <TextInput
                    label="Last name"
                    value={lName}
                    onChangeText={setLName}
                    mode="outlined"
                    style={[styles.input, { backgroundColor: theme.colors.surface }]}
                    left={<TextInput.Icon icon="account" />}/>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    style={[styles.input, { backgroundColor: theme.colors.surface }]}
                    left={<TextInput.Icon icon="email" />}
                    keyboardType="email-address"
                    autoCapitalize="none"/>
                <TextInput
                    label="Password"
                    value={rawPassword}
                    onChangeText={setRawPassword}
                    mode="outlined"
                    style={[styles.input, { backgroundColor: theme.colors.surface }]}
                    left={<TextInput.Icon icon="lock" />}
                    secureTextEntry/>
                <Button
                    mode="contained"
                    onPress={handleRegister}
                    style={[styles.button, { backgroundColor: theme.colors.primary }]}
                    labelStyle={{ color: theme.colors.onPrimary }}>
                    Register
                </Button>
                <Button
                    mode="text"
                    onPress={() => router.push('/login')}
                    contentStyle={{ paddingHorizontal: 0, paddingVertical: 8 }}
                    labelStyle={{ color: theme.colors.secondary, textDecorationLine: 'underline' }}>
                    Already have an account?
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
    )
};

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
