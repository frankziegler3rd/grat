/*
 * grat - senior project
 * entry point
 *
 * @author frank ziegler
 * @version 1.0.0
 */
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {

    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState<string | null>(null);

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem("token");
            console.log(token);
            setRedirect(token ? "/(tabs)/home" : "/(auth)/onboard");
            setLoading(false);
        };
        checkToken();
    }, []);

    if(loading)
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );

    if(!redirect) return null;
    
    return <Redirect href={redirect} />;
}
