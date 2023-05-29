import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet, Alert } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

const DOBPicker = ({ onDOBChange }) => {
  const [dob, setDOB] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(Platform.OS === 'ios');
  
    // Validate the selected date of birth
    if (currentDate < new Date()) {
      setDOB(currentDate);
      onDOBChange(currentDate);
    } else {
      // Handle invalid date of birth
      Alert.alert('Invalid Date', 'Please select a valid date of birth.');
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleDatePicker}>
        <Text style={styles.buttonText}>
          {dob ? dob.toLocaleDateString() : 'Select DOB'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dob || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          style={styles.datePicker}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // marginBottom: 20,
  },
  button: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  datePicker: {
    marginTop: 20,
  },
});

export default DOBPicker;