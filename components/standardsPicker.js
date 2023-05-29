import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';

const SignupScreen = ({ selectedStandard, onStandards }) => {
  // const [name, setName] = useState('');
  // const [mobileNumber, setMobileNumber] = useState('');
  // const [email, setEmail] = useState('');
  // const [selectedStandard, setSelectedStandard] = useState('');

  const standards = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

  // const handleSignup = () => {
  //   // Perform signup logic here
  //   console.log('Name:', name);
  //   console.log('Mobile Number:', mobileNumber);
  //   console.log('Email:', email);
  //   console.log('Selected Standard:', selectedStandard);
  // };

  return (
      <View style={{ flex: 1, padding: 20 }}>
      <ModalDropdown
          options={standards}
          defaultValue="Select Standard"
          // onSelect={(_, value) => onStandards(standards[value])}
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