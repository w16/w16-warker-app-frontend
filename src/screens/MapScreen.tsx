import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { View } from 'react-native';
import Map from '../components/MapView';
import { DataProvider } from '../contexts/DataContext';
import { GeolocationProvider } from '../contexts/GeolocationContext';

/**
 * @author Lucas Creator
 */

export default function MapScreen({route}: any) {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <GeolocationProvider>
                <DataProvider>
            <Map params={route.params} />
            </DataProvider>
            </GeolocationProvider>
        </View>
    );
}
    