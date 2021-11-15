import { 
    Text as DefaultText, 
    View as DefaultView ,
    TouchableOpacityProps,
    ImageSourcePropType
} from 'react-native';

// Themeprops for dark and white theme
export type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
  };

// Adding themeprops of lightcolor and darkColor with the default Props of Text and View

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];


// Custom Button Props with Pressable Component and own props
export type CustomButtonProps = {
    title: string,
    radius: number,
    onPress?: () => void;
}

// custom Button elwement with the TouchableOpacity for IOS and TOuchableNativeFeedback for Android
export interface CustomTouchableOpacityProps extends TouchableOpacityProps {
    textTitle: string,
    backgroundColor: string
    radius: number
}


// Row for dispalying the contact data the contact Screen.
export type RowProps = {
    image : ImageSourcePropType,
    title: string,
    subtitle: string,
    onPress?: () => void;
}


export type SimpleRowProps = {
  title?: string,
  subtitle?: string
}

