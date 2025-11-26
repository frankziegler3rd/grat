/**
 * grat - senior project
 * session provider for managing login state
 *
 * @author frank ziegler
 * @version 1.0.0
 */
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadSession = async () => {
            const token = await AsyncStorage.getItem("token");
            setSession(token ? { token } : null);
            setIsLoading(false);
        };
        loadSession();
    }, []);

    const signIn = async (token) => {
        await AsyncStorage.setItem("token", token);
        setSession({ token });
    };

    const signOut = async () => {
        await AsyncStorage.removeItem("token");
        setSession(null);
    };

    return (
        <SessionContext.Provider value={{ session, isLoading, signIn, signOut }}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => useContext(SessionContext);
