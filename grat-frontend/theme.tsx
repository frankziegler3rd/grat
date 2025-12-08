/**
 * grat – senior project
 * app theme
 * 
 * @author frank ziegler
 * @version 1.0.0
 */

import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
    default: {
        regular: { fontFamily: 'System', fontWeight: '400' },
        medium:  { fontFamily: 'System', fontWeight: '500' },
        light:   { fontFamily: 'System', fontWeight: '300' },
        thin:    { fontFamily: 'System', fontWeight: '200' },
    }
};

export const darkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#7ED957',
        onPrimary: '#111111',
        secondary: '#00E5FF',
        onSecondary: '#111111',
        background: '#111111',
        surface: '#1A1A1A',
        onSurface: '#FAFAFA',
        error: '#FF6B6B',
        text: '#FAFAFA',
        disabled: '#555555',
        placeholder: '#AAAAAA',
    },
    fonts: configureFonts(fontConfig),
    roundness: 16,
};
