import React from 'react';
import { View } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

const SignupScreen = ({ selectedStandards, onStandards }) => {

  const standards = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  const defaultValue ="Select Standard"

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ModalDropdown
        options={standards}
        defaultValue={`${selectedStandards?selectedStandards:defaultValue}`}
        onSelect={onStandards}
        style={{ marginTop: 10, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, borderWidth: 1, borderColor: 'gray' }}
        textStyle={{ fontSize: 16 }}
        dropdownStyle={{ borderRadius: 5, borderWidth: 1, borderColor: 'gray' }}
        dropdownTextStyle={{ fontSize: 16 }}
      />
    </View>
  );
};

export default SignupScreen