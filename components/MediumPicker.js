import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const Gender = ({ selectedMedium, onSelectMedium }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onSelectMedium('hindi')} style={styles.option}>
        <FontAwesome
          name={selectedMedium === 'hindi' ? 'check-circle' : 'circle'}
          size={20}
          color={selectedMedium === 'hindi' ? 'green' : 'gray'}
        />
        <Text style={styles.optionText}>Hindi</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onSelectMedium('english')} style={styles.option}>
        <FontAwesome
          name={selectedMedium === 'english' ? 'check-circle' : 'circle'}
          size={20}
          color={selectedMedium === 'english' ? 'green' : 'gray'}
        />
        <Text style={styles.optionText}>English</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onSelectMedium('marathi')} style={styles.option}>
        <FontAwesome
          name={selectedMedium === 'marathi' ? 'check-circle' : 'circle'}
          size={20}
          color={selectedMedium === 'marathi' ? 'green' : 'gray'}
        />
        <Text style={styles.optionText}>Marathi</Text>
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


