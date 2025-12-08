/**
 * grat - senior project
 * header bar
 *
 * @author frank ziegler
 * @version 1.0.0
 */

import React from 'react';
import { 
    View, 
    StyleSheet 
} from 'react-native';
import { 
    IconButton, 
    useTheme 
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import GratIcon from '../../assets/gratHeaderLogo.svg';
import { useRouter } from 'expo-router';

export default function Header() {
    
    const theme = useTheme();
    const router = useRouter();

    return (
        <View style={{ backgroundColor: theme.colors.surface }}>
            <SafeAreaView edges={['top']} />
            <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
                <GratIcon width={140} height={36} />
                <IconButton 
                    icon="cog-outline"
                    size={28}
                    iconColor={theme.colors.primary}
                    onPress={ () => router.push("/(settings)") } />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
});
