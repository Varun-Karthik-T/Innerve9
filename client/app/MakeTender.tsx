import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

export default function MakeTender() {
  const { issue } = useLocalSearchParams();
  const parsedIssue = JSON.parse(Array.isArray(issue) ? issue[0] : issue);

  const [tenderId, setTenderId] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [formOfContract, setFormOfContract] = useState('');
  const [paymentMode, setPaymentMode] = useState('');

  const handleSubmit = () => {
    // Handle the submission of tender details
    console.log({
      tenderId,
      referenceNumber,
      type,
      category,
      formOfContract,
      paymentMode,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Issue Type</Text>
          <Text style={styles.value}>{parsedIssue.issue_type}</Text>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{parsedIssue.description}</Text>
          <Text style={styles.label}>Image</Text>
          {parsedIssue.image && <Image source={{ uri: parsedIssue.image }} style={styles.cardImage} />}
          <Text style={styles.label}>Date of Complaint</Text>
          <Text style={styles.value}>{parsedIssue.date_of_complaint}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Tender ID</Text>
          <TextInput
            style={styles.input}
            value={tenderId}
            onChangeText={setTenderId}
            placeholder="Enter Tender ID"
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Reference Number</Text>
          <TextInput
            style={styles.input}
            value={referenceNumber}
            onChangeText={setReferenceNumber}
            placeholder="Enter Reference Number"
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Type</Text>
          <TextInput
            style={styles.input}
            value={type}
            onChangeText={setType}
            placeholder="Enter Type"
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder="Enter Category"
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Form of Contract</Text>
          <TextInput
            style={styles.input}
            value={formOfContract}
            onChangeText={setFormOfContract}
            placeholder="Enter Form of Contract"
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Payment Mode</Text>
          <TextInput
            style={styles.input}
            value={paymentMode}
            onChangeText={setPaymentMode}
            placeholder="Enter Payment Mode"
          />
        </Card.Content>
      </Card>

      <Button title="Submit Tender" onPress={handleSubmit} color="#008080" /> {/* Teal color */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginVertical: 10,
    padding: 16,
  },
  label: {
    fontSize: 18, // Increase font size
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 18, // Increase font size
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
});