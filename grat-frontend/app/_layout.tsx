/**
 * grat - senior project
 * root layout
 *
 * @author frank ziegler
 * @version 1.0.0
 */

import { Stack } from "expo-router";
import { 
    PaperProvider, 
    DefaultTheme 
} from 'react-native-paper';
import { View } from 'react-native';
import { darkTheme } from "../theme.tsx";

export default function RootLayout() {
    
    return (
        <PaperProvider theme={darkTheme}>
            <Stack options={{ headerShown: false }}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(settings)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="new_shift"
                    options={{
                        presentation: "modal",
                        headerShown: false,
                        title: "new shift",
                    }} />
                <Stack.Screen
                    name="modify_shift"
                    options={{
                        presentation: "modal",
                        headerShown: false,
                        title: "shift",
                    }} />
            </Stack>
        </PaperProvider>
    );
}
