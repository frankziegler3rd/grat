/**
 * grat - senior project
 * onboarding screen
 *
 * @author frank ziegler
 * @version 1.0.0
 */

import { StyleSheet } from "react-native";
import { 
    Button,  
    useTheme, 
    Text 
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { 
    Path 
} from 'react-native-svg';
import GratIcon from '../../assets/CLAR.svg';

export default function Onboard() {

    const router = useRouter();
    const theme = useTheme();

    return ( 
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background } ]}> 
            <GratIcon width={800} height={500} style={{ alignSelf: 'center', marginLeft: 40 }} /> 
            <Text style={[ styles.headerText, { color: theme.colors.text, paddingVertical: 24 }]}> 
                Managing gratuity, one shift at a time. 
            </Text> 
            <Button 
                icon="account-plus" 
                mode="contained" onPress={() => router.push('/register')} 
                style={{ marginVertical: 8, borderRadius: 8 }}> 
                Register 
            </Button> 
            <Button 
                icon="login" 
                mode="contained" 
                onPress={() => router.push('/login')} 
                style={{ marginVertical: 8, borderRadius: 8 }}> 
                Login 
            </Button> 
        </SafeAreaView> 
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 40, 
        fontWeight: "500", 
        paddingVertical: 24, 
    },
});
