

import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getProfile(){
  let data = {};

  try{
    data = await AsyncStorage.getItem('userDetails');
    data = JSON.parse(data);
  }catch(e){
    console.log(e);
  }

  return data
}