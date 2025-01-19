import * as React from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from './config';

const PeopleIssue = () => {
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState(null);
  const [dateOfComplaint, setDateOfComplaint] = useState(new Date().toISOString().split('T')[0]);

  const handleCaptureImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].base64);
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
  };

  const handleSubmit = async () => {
    if (!issueType || !description || !location) {
      alert('Please fill in all fields and capture an image.');
      return;
    }

    const issue = {
      id: new Date().getTime().toString(),
      issue_type: issueType,
      description,
      date_of_complaint: dateOfComplaint,
      approval: 0,
      denial: 0,
      status: 'pending',
      location,
    };

    try {
      const response = await axios.post(`http://${config.ipAddress}:4000/issues`, issue);
      console.log('Issue raised:', response.data);
      alert('Issue raised successfully!');
    } catch (error) {
      console.error('Error raising issue:', error);
      alert('There was an error raising the issue. Please try again.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Issue Type</Text>
          <TextInput
            style={styles.input}
            value={issueType}
            onChangeText={setIssueType}
            placeholder="Enter issue type"
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            multiline
          />
          <Button title="Capture Image" onPress={handleCaptureImage} color="#2c3e50" /> {/* Change color to #2c3e50 */}
          {image && <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={styles.image} />}
          <View style={styles.buttonContainer}>
            <Button title="Submit Issue" onPress={handleSubmit} color="#2c3e50" /> {/* Change color to #2c3e50 */}
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: 20,
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 8,
    borderRadius: 4,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default PeopleIssue;