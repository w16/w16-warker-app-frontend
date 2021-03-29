import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View } from 'react-native';
import FilterForm from '../components/FilterForm';
import { DataProvider } from '../contexts/DataContext';

/**
 * @author Lucas Creator
 */

export default function FilterScreen() {
    const navigation = useNavigation()

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <DataProvider>
                    <FilterForm />
                </DataProvider>
        </View>
    )
}

