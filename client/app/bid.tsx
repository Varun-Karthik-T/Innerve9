import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';

const BidPage = () => {
  const [bidAmount, setBidAmount] = useState('');
  const [document, setDocument] = useState<DocumentPicker.DocumentPickerResult | null>(null);
  const [errors, setErrors] = useState<{ bidAmount?: string }>({});

  // Handle document upload
  const handleDocumentUpload = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Allow only PDF files
      });

      console.log('Document Picker Result:', res); // Debugging line

      if (!res.canceled) {
        setDocument(res.assets[0]); // Use the first selected file
      } else {
        console.log('User cancelled document picker');
      }
    } catch (err) {
      console.log('Document picker error:', err);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: { bidAmount?: string } = {};

    // Validate bid amount
    if (!bidAmount) {
      newErrors.bidAmount = 'Bid amount is required';
    } else if (isNaN(Number(bidAmount))) {
      newErrors.bidAmount = 'Bid amount must be a number';
    } else if (Number(bidAmount) <= 0) {
      newErrors.bidAmount = 'Bid amount must be positive';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    if (!document) {
      Alert.alert('Error', 'Please upload a document');
      return;
    }

    // Prepare bid data
    const bidData = {
      bidAmount: bidAmount,
      document: document,
    };

    console.log('Bid Data:', bidData);
    Alert.alert('Success', 'Bid submitted successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Submit Your Bid</Text>

      {/* Bid Amount Input */}
      <TextInput
        label="Bid Amount"
        mode="outlined"
        keyboardType="numeric"
        value={bidAmount}
        onChangeText={(text) => setBidAmount(text)}
        error={!!errors.bidAmount}
        style={styles.input}
      />
      {errors.bidAmount && (
        <Text style={styles.errorText}>{errors.bidAmount}</Text>
      )}

      {/* Document Upload */}
      <Button
        mode="contained"
        onPress={handleDocumentUpload}
        style={styles.uploadButton}
      >
        {document ? 'Change Document' : 'Upload Document'}
      </Button>

      {/* Display Selected Document */}
      {document && (
        <View style={styles.documentContainer}>
          <Text style={styles.documentText}>
            Selected Document: {document.name}
          </Text>
        </View>
      )}

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.submitButton}
      >
        Submit Bid
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  uploadButton: {
    marginBottom: 15,
    backgroundColor: '#16a085',
  },
  documentContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  documentText: {
    fontSize: 14,
    color: '#34495e',
    textAlign: 'center',
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: '#2c3e50',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default BidPage;