/**
 * grat - senior project
 * settings index
 *
 * @author frank ziegler
 * @version 1.0.0
 */

import { 
    List, 
    useTheme, 
    FAB, 
    Icon 
} from "react-native-paper";
import { 
    StyleSheet, 
    Text 
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { baseURL } from "../../constants/api.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Index() {

    const router = useRouter();
    const theme = useTheme();

    // function to ping the server for testing
    const ping = async () => {
        try {
            const response = await axios.get(`${baseURL}/user/ping`);
            console.log(response.data);
        } catch (error: any) {
            console.log(error.response?.data);
        }
    };

    // event handler for logout presses
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
                         
                    console.log(msg);
                }
            }
            await AsyncStorage.clear();
            router.replace("/(auth)/onboard");
        } catch (error: any) {
            console.error("logout failed:", error.response?.data || error.message);
        }
    };


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>    
            <Text style={[styles.headerText, { color: theme.colors.text }]}>
                Settings
            </Text>
            <List.Section style={styles.container}>
                <List.Item 
                    title="Ping"
                    titleStyle={styles.listItemTitleStyle}
                    left={() => <List.Icon icon="send-circle-outline"/>}
                    right={() => <List.Icon icon="chevron-right" color={theme.colors.placeholder}/>}
                    style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.surface }}
                    onPress={ping} />
                <List.Item
                    title="Manage account"
                    titleStyle={styles.listItemTitleStyle}
                    left={() => <List.Icon icon="account"/>}
                    right={() => <List.Icon icon="chevron-right" color={theme.colors.placeholder}/>}
                    style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.surface }} />
                <List.Item
                    title="Privacy & security"
                    titleStyle={styles.listItemTitleStyle}
                    left={() => <List.Icon icon="security"/>}
                    right={() => <List.Icon icon="chevron-right" color={theme.colors.placeholder}/>}
                    style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.surface }} />
                <List.Item 
                    title="Dark mode" 
                    titleStyle={styles.listItemTitleStyle}
                    left={() => <List.Icon icon="theme-light-dark"/>}
                    right={() => <List.Icon icon="chevron-right" color={theme.colors.placeholder}/>}
                    style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.surface }} />
                <List.Item 
                    title="Share app" 
                    titleStyle={styles.listItemTitleStyle}
                    left={() => <List.Icon icon="share-outline"/>}
                    right={() => <List.Icon icon="chevron-right" color={theme.colors.placeholder}/>}
                    style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.surface }} />
                <List.Item 
                    title="Rate app" 
                    titleStyle={styles.listItemTitleStyle}
                    left={() => <List.Icon icon="star-outline"/>}
                    right={() => <List.Icon icon="chevron-right" color={theme.colors.placeholder}/>}
                    style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.surface }} />
                <List.Item 
                    title="Contact" 
                    titleStyle={styles.listItemTitleStyle}
                    left={() => <List.Icon icon="email-outline"/>}
                    right={() => <List.Icon icon="chevron-right" color={theme.colors.placeholder}/>}
                    style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.surface }} />
                <List.Item 
                    title="Terms and conditions" 
                    titleStyle={styles.listItemTitleStyle}
                    left={() => <List.Icon icon="file-document-outline"/>}
                    right={() => <List.Icon icon="chevron-right" color={theme.colors.placeholder}/>}
                    style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.surface }} />
                <List.Item 
                    title="Logout" 
                    titleStyle={[styles.listItemTitleStyle, { color: theme.colors.error }] }
                    left={() => <List.Icon icon="logout" color={theme.colors.error}/>}
                    style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.surface }}
                    onPress={handleLogout} />
            </List.Section>
            <FAB
                icon="arrow-left"
                style={[styles.fab, { backgroundColor: theme.colors.surface }]}
                small
                onPress={() => router.back()} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    headerText: {
        fontSize: 32,
        fontWeight: '700',
        paddingVertical: 16,
        textAlign: 'center',
    },
    listItemTitleStyle: {
        fontSize: 22,
    },
    fab: {
        position: "absolute",
        top: 64,
        left: 24,
        elevation: 4,
    }
});
