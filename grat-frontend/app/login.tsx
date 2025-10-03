/**
 * grat – senior project
 * login screen
 * 
 * @author frank ziegler
 * @version 1.0.0
 * 
 * 
 * ### TODO ###
 * 1. Make it pretty
 * 2. Add real-time validation of input
 * 3. Handle server request once server is up and running
 * 
 */

import React, { useState } from 'react';
import { View } from "react-native";
import { Button, TextInput } from 'react-native-paper';

export default function Login() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log(username, password)
    }

    return (
        <View>
            <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput 
                label="Password"
                value={password}
                onChangeText={setPassword}
            />
            <Button mode="contained" onPress={handleLogin}>Submit</Button>
        </View>
    );
};