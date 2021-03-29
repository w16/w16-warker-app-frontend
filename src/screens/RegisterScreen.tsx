import * as React from 'react';
import { View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RegisterForm from '../components/RegisterForm';

/**
 * @author Lucas Creator
 */

export default function LoginScreen() {
    const navigation = useNavigation();
    
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../assets/background.png')}
                style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}
            >
                <RegisterForm />
            </ImageBackground>
        </View>
    );
  }