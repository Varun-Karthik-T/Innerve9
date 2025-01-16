import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { useRouter } from 'expo-router';
import axios from 'axios'; // Import Axios
import config from '@/app/config';

interface MyComponentProps {
  title: string;
  content: string;
  onPress: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, content, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Card>
      <Card.Content>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardContent}>{content}</Text>
      </Card.Content>
    </Card>
  </TouchableOpacity>
);

const CardWithMargin: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.cardContainer}>{children}</View>
);

export default function Page1() {
  const [data, setData] = useState<Array<any>>([]);
  const router = useRouter();

  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${config.ipAddress}:4000/issues`); // Make the request
        setData(response.data); // Set the data from the response
      } catch (error) {
        console.error('Error fetching data:', error); // Handle errors
      }
    };

    fetchData(); // Call the async function
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Public Grievances</Text>
      {data.map((item) => (
        <CardWithMargin key={item.id}>
          <MyComponent
            title={item.issue_type}
            content={item.description}
            onPress={() => router.push({ pathname: '/MakeTender', params: { issue: JSON.stringify(item) } })}
          />
        </CardWithMargin>
      ))}
    </ScrollView>
  );
}

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
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  cardContent: {
    fontSize: 16,
    color: '#16a085',
  },
});