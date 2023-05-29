import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const Gender = ({ selectedGender, onSelectGender }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onSelectGender('male')} style={styles.option}>
        <FontAwesome
          name={selectedGender === 'male' ? 'check-circle' : 'circle'}
          size={20}
          color={selectedGender === 'male' ? 'green' : 'gray'}
        />
        <Text style={styles.optionText}>Male</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onSelectGender('female')} style={styles.option}>
        <FontAwesome
          name={selectedGender === 'female' ? 'check-circle' : 'circle'}
          size={20}
          color={selectedGender === 'female' ? 'green' : 'gray'}
        />
        <Text style={styles.optionText}>Female</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onSelectGender('other')} style={styles.option}>
        <FontAwesome
          name={selectedGender === 'other' ? 'check-circle' : 'circle'}
          size={20}
          color={selectedGender === 'other' ? 'green' : 'gray'}
        />
        <Text style={styles.optionText}>Other</Text>
      </TouchableOpacity>
    </View>
  );
};




export default Gender;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  option: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'normal',
    marginLeft: 5,
  },
});


