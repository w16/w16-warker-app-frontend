import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './src/screens/MapScreen';
import LoginScreen from './src/screens/LoginScreen';
import FilterScreen from './src/screens/FilterScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { UserProvider } from './src/contexts/UserContext';
import { t } from './src/i18n';

/**
 * @author Lucas Creator
 */

const Stack = createStackNavigator();

export default function App() {
    return (
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Login" 
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#F3F4F5',
                        },
                        headerTintColor: '#CA5501',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            color: "#CA5501",
                        },
                    }}
                >
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen} 
                        options={{
                            title: t('LoginScreen'),
                        }}
                    />
                    
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen} 
                        options={{
                            title: t('RegisterScreen'),
                        }}
                    />
                    
                    <Stack.Screen
                        name="Map"
                        component={MapScreen} 
                        options={{
                            title: t('MapScreen'),
                        }}
                    />
                    
                    <Stack.Screen
                        name="Filter"
                        component={FilterScreen} 
                        options={{
                            title: t('FilterScreen'),
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
}
