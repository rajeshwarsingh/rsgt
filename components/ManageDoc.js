
import React, { useState } from 'react';
import { Button, Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { MaterialIcons } from '@expo/vector-icons';



export default function MyComponent() {
  const [loading, setLoading] = useState(false);

  const downloadAndOpenFile = async () => {
    setLoading(true);

    const fileUri = FileSystem.documentDirectory + 'example.pdf'; // Replace with the desired file name and extension
    const fileUrl = 'https://www.africau.edu/images/default/sample.pdf'; // Replace with the actual file URL

    try {
      const downloadResumable = FileSystem.createDownloadResumable(fileUrl, fileUri);

      const { uri } = await downloadResumable.downloadAsync();
      console.log('File downloaded to:', uri);

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('An error occurred while downloading or sharing the file.', error);
    }

    setLoading(false);
  };

  // return (
  //   // <View>
  //   //   <Button title="Download" onPress={downloadAndOpenFile} style={{textAlign:'center'}} />
  //   //   {loading && <Text>Downloading...</Text>}
  //   // </View>
  //   <View style={styles.container}>
  //     <Button
  //       title="Download"
  //       onPress={downloadAndOpenFile}
  //       icon={() => <MaterialIcons name="cloud-download" size={24} color="white" />}
  //     />
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={downloadAndOpenFile}>
        <MaterialIcons name="cloud-download" size={24} color="white" />
        {/* <Text style={styles.buttonText}>Download</Text> */}
        <Text style={styles.buttonText}>{loading ? 'Downloading...' : 'Download'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    marginLeft: 5,
    color: 'white',
    fontSize: 16,
  },
});