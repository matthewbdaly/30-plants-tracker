import React, { useState } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

const Settings = () => {
    const [selectedDay, setSelectedDay] = useState('Sunday');

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select the day of the week to reset the list:</Text>
            <Picker
                selectedValue={selectedDay}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedDay(itemValue)}
            >
                <Picker.Item label="Sunday" value="Sunday" />
                <Picker.Item label="Monday" value="Monday" />
                <Picker.Item label="Tuesday" value="Tuesday" />
                <Picker.Item label="Wednesday" value="Wednesday" />
                <Picker.Item label="Thursday" value="Thursday" />
                <Picker.Item label="Friday" value="Friday" />
                <Picker.Item label="Saturday" value="Saturday" />
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    picker: {
        height: 50,
        width: '100%',
    },
});

export default Settings;