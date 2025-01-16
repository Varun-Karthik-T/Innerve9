import * as React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Card, Text, Button, FAB } from 'react-native-paper';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import axios from 'axios';
import config from './config';

interface Issue {
  id: string;
  name: string;
  issue_type: string; // Replace problem_type with issue_type
  description: string;
  date_of_complaint: string;
  approval: number;
  denial: number;
  status: string;
  image: string; // Add image property
  location: {
    latitude: number;
    longitude: number;
  }; // Add location property
}

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    0.5 - Math.cos(dLat) / 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * (1 - Math.cos(dLon)) / 2;
  return R * 2 * Math.asin(Math.sqrt(a));
};

const IssueCard: React.FC<{ issue: Issue; userLocation: Location.LocationObjectCoords | null }> = ({ issue, userLocation }) => {
  const distance = userLocation ? getDistance(userLocation.latitude, userLocation.longitude, issue.location.latitude, issue.location.longitude) : null;
  const votable = distance !== null && distance <= 4;

  const handlePress = () => {
    router.push({
      pathname: './peopleVote',
      params: {
        issue: JSON.stringify({ ...issue, votable: votable ? 1 : 0 }), // Pass the serialized issue object as a parameter
      },
    });
  };

  return (
    <Card style={[styles.card, !votable && { opacity: 0.5 }]}>
      <Card.Content>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text variant="titleLarge" style={styles.issueName}>{issue.issue_type}</Text>
            <Text variant="bodyMedium" numberOfLines={2} ellipsizeMode="tail" style={styles.issueDescription}>
              {issue.description}
            </Text>
          </View>
          <Button style={styles.viewButton} onPress={handlePress} labelStyle={styles.viewButtonText}>View</Button>
        </View>
      </Card.Content>
    </Card>
  );
};

const MyComponent = () => {
  const [userLocation, setUserLocation] = React.useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [issues, setIssues] = React.useState<Issue[]>([]);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching location:', error);
      setTimeout(getLocation, 5000); // Retry after 5 seconds
    }
  };

  const fetchIssues = async () => {
    try {
      console.log(config.ipAddress);
      const response = await axios.get(`http://${config.ipAddress}:4000/issues`); // Use your machine's IP address
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  React.useEffect(() => {
    getLocation();
    fetchIssues();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={issues}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <IssueCard issue={item} userLocation={userLocation} />}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => router.push('/peopleIssue')} // Adjust this if you need the FAB to navigate somewhere else
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, // Increase padding
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 10,
    padding: 16, // Increase padding
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  issueName: {
    textAlign: 'left',
  },
  issueDescription: {
    textAlign: 'left',
    opacity: 0.8,
  },
  viewButton: {
    alignSelf: 'center',
     // Change color to teal
     backgroundColor: 'lightgrey',
  },
  viewButtonText: {
    fontSize: 18, // Increase font size
    color: '#16a085',
  },
  fab: {
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
    backgroundColor: '#a7e8b8',
    color: 'white'
    
  },
});

export default MyComponent;