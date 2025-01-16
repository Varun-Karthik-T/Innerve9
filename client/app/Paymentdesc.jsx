import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import config from './config';

const AdminPaymentPage = () => {
  const { contract } = useLocalSearchParams();
  const contractData = JSON.parse(contract); // Parse the contract data passed from the previous screen
  const referenceId = contractData.referenceId; // Extract referenceId from contract data

  const [payment, setPayment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch payment by referenceId on component mount
  useEffect(() => {
    const fetchPayment = async () => {
      if (!referenceId) {
        Alert.alert('Error', 'No reference ID found in contract data.');
        return;
      }

      setIsLoading(true);

      try {
        const response = await axios.get(`http://${config.ipAddress}:4000/govcontract/${referenceId}`);
        setPayment(response.data);
      } catch (error) {
        console.error('Error fetching payment:', error);
        Alert.alert('Error', 'Failed to fetch payment. Please check the reference ID.');
        setPayment(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayment();
  }, [referenceId]); // Re-fetch when referenceId changes

  // Handle approve/deny action
  const handleUpdateStatus = async (status,id) => {
    if (!payment) return;

    try {

      console.log("id",id);
      const response = await axios.put(`http://${config.ipAddress}:4000/payments/`, {
        id,
        status: status,
      });

      // Update the local state with the updated payment
      console.log('Payment status updated:', response);
      setPayment({ ...payment, status: response.data.status });

      Alert.alert('Success', `Payment ${status ? 'approved' : 'denied'} successfully!`);
    } catch (error) {
      console.error('Error updating payment status:', error);
      Alert.alert('Error', 'Failed to update payment status.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin Payment Dashboard</Text>

      {isLoading ? (
        <Text style={styles.loadingText}>Loading pending payments...</Text>
      ) : payment && payment.length > 0 ? (
        payment.map((payment) => (
          <View key={payment._id} style={styles.paymentContainer}>
            <Text style={styles.paymentText}>Reference ID: {payment.referenceId}</Text>
            <Text style={styles.paymentText}>Bid Amount: ₹{payment.bidAmount.toLocaleString()}</Text>
            <Text style={styles.paymentText}>Amount Used: ₹{payment.amountUsed.toLocaleString()}</Text>
            <Text style={styles.paymentText}>Payment Made: ₹{payment.paymentMade.toLocaleString()}</Text>
            <Text style={styles.paymentText}>Status: Pending</Text>

            {/* Approve/Deny Buttons */}
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={() => handleUpdateStatus( true,payment._id)}
                style={styles.approveButton}
              >
                Approve
              </Button>
              <Button
                mode="contained"
                onPress={() => handleUpdateStatus( false,payment._id)}
                style={styles.denyButton}
              >
                Deny
              </Button>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noPaymentsText}>No pending payments found.</Text>
      )}
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
  paymentContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  approveButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#16a085',
  },
  denyButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#e74c3c',
  },
  noPaymentText: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AdminPaymentPage;