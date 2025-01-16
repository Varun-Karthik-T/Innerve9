import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

const BidAuth = () => {
  const { tender } = useLocalSearchParams();
  const contractData = JSON.parse(tender);

  // Dummy bidders data
  const [bidders, setBidders] = useState([
    { id: 1, name: 'John Doe', bidAmount: 50000 },
    { id: 2, name: 'Jane Smith', bidAmount: 45000 },
    { id: 3, name: 'Alice Johnson', bidAmount: 47000 },
  ]);

  const [selectedBidder, setSelectedBidder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleApproveBid = async () => {
    if (!selectedBidder) {
      Alert.alert('Error', 'Please select a bidder to approve');
      return;
    }

    setIsLoading(true);

    try {
      // Send the winner data to the server
      const data = {
        name: selectedBidder.name,
        bidAmount: selectedBidder.bidAmount,
        contractId: contractData._id,
        contractorId: selectedBidder.id,
      };
      // const response = await axios.post('http://192.168.54.15:4000/approveBid', data);

      Alert.alert('Success', 'Bid approved successfully!');
      console.log('Response:', data);
    } catch (error) {
      Alert.alert('Error', 'Failed to approve bid');
      console.error('Error approving bid:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bid Approval</Text>
      {bidders.map((bidder) => (
        <TouchableOpacity key={bidder.id} onPress={() => setSelectedBidder(bidder)}>
          <Card style={[styles.cardContainer, selectedBidder?.id === bidder.id && styles.selectedCard]}>
            <Card.Content>
              <Text style={styles.cardTitle}>Bidder Name: {bidder.name}</Text>
              <Text style={styles.cardContent}>Bid Amount: ₹{bidder.bidAmount.toLocaleString()}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
      <Button
        title="Approve Bid"
        onPress={handleApproveBid}
        disabled={isLoading}
        color="#2c3e50" // Button color matching the theme
      />
    </View>
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
  cardContainer: {
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 3, // Add shadow
  },
  selectedCard: {
    borderColor: '#16a085',
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
    color: '#16a085',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#2c3e50',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
});

export default BidAuth;