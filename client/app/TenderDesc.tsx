import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from 'react-native-paper';

const TenderDesc = () => {
  const { tender } = useLocalSearchParams();
  const router = useRouter();
  const tenderData = JSON.parse(tender);

  const handlebid = () => {
    // Add your bid logic here
    console.log('Proceeding to bid for Tender ID:', tenderData.tenderId);
    alert(`Proceeding to bid for Tender ID: ${tenderData.tenderId}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tenderData.organisationChain}</Text>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Tender ID:</Text>
        <Text style={styles.value}>{tenderData.tenderId}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Reference Number:</Text>
        <Text style={styles.value}>{tenderData.tenderReferenceNumber}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Type:</Text>
        <Text style={styles.value}>{tenderData.tenderType}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Category:</Text>
        <Text style={styles.value}>{tenderData.tenderCategory}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Form of Contract:</Text>
        <Text style={styles.value}>{tenderData.formOfContract}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Payment Mode:</Text>
        <Text style={styles.value}>{tenderData.paymentMode}</Text>
      </View>

      {/* bid Button */}
      <Button
        icon="contactless-payment-circle"
        style={styles.bidButton}
        labelStyle={styles.bidButtonText}
        onPress={() => router.push('/bid' )}
      >
        Make bid
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Light background color
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50', // Dark blue color for the title
    textAlign: 'center', // Center-align the title
  },
  detailContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#ffffff', // White background for each detail container
    borderRadius: 8, // Rounded corners
    shadowColor: '#000', // Shadow for a card-like effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Elevation for Android
  },
  label: {
    fontSize: 16,
    fontWeight: '600', // Semi-bold for labels
    color: '#34495e', // Dark gray color for labels
    marginBottom: 5, // Space between label and value
  },
  value: {
    fontSize: 18,
    fontWeight: '400', // Regular weight for values
    color: '#16a085', // Highlight color for values (teal)
  },
  bidButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#16a085', // Teal background for the button
    borderRadius: 8, // Rounded corners
    alignItems: 'center', // Center-align text
  },
  bidButtonText: {
    fontSize: 18,
    fontWeight: '600', // Semi-bold text
    color: '#ffffff', // White text color
  },
});

export default TenderDesc;