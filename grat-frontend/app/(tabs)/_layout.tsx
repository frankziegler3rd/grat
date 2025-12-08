/**
 * grat - senior project
 * (tabs) stack layout
 *
 * @author frank ziegler
 * @version 1.0.0
 */

import { 
    Stack, 
    Tabs 
} from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from 'react-native-paper';

export default function TabsLayout() {
   
    const theme = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.placeholder,
                tabBarStyle: {
                    backgroundColor: theme.colors.surface,
                    borderTopColor: 'transparent',
                    height: 70,
                    paddingBottom: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />
                }}/>
            <Tabs.Screen
                name="stats"
                options={{
                    tabBarIcon: ({ color }) => <FontAwesome size={24} name="bar-chart" color={color} />
                }}/>
            <Tabs.Screen
                name="history"
                options={{
                    tabBarIcon: ({ color }) => <FontAwesome size={24} name="history" color={color} />
                }}/>
        </Tabs>
    );
};
