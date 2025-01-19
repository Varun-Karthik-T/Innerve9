import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { Card, Text, Button, FAB, Surface, ActivityIndicator } from "react-native-paper";
import { router } from "expo-router";
import * as Location from "expo-location";
import api from "@/api/api";

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    0.5 -
    Math.cos(dLat) / 2 +
    (Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      (1 - Math.cos(dLon))) /
      2;
  return R * 2 * Math.asin(Math.sqrt(a));
};

const PeopleHome = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState([]);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching location:", error);
      setTimeout(getLocation, 5000);
    }
  };

  const fetchIssues = async () => {
    try {
      const response = await api.get("/issues");
      setIssues(response.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  useEffect(() => {
    getLocation();
    fetchIssues();
  }, []);

  if (loading) {
    return (
      <Surface style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="rgb(55, 106, 24)" />
      </Surface>
    );
  }

  return (
    <Surface style={styles.container}>
      <FlatList
        data={issues}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <IssueCard issue={item} userLocation={userLocation} />
        )}
      />
      <FAB
        style={styles.fab}
        icon="exclamation-thick"
        size="small"
        mode="elevated"
        variant="tertiary"
        onPress={() => router.push("/peopleIssue")}
        label="Report a new issue"
      />
    </Surface>
  );
};

const IssueCard = ({ issue, userLocation }) => {
  const distance = userLocation
    ? getDistance(
        userLocation.latitude,
        userLocation.longitude,
        issue.location.latitude,
        issue.location.longitude
      )
    : null;
  const votable = distance !== null && distance <= 4;

  const handlePress = () => {
    router.push({
      pathname: "./peopleVote",
      params: {
        issue: JSON.stringify({ ...issue, votable: votable ? 1 : 0 }),
      },
    });
  };

  return (
    <Card style={[styles.card, !votable && { opacity: 0.5 }]}>
      <Card.Title title={issue.issue_type} titleStyle={styles.title} />
      <Card.Content>
        <View style={styles.cardContent}>
          <Text style={styles.description}>{issue.description}</Text>
          <Image source={{ uri: issue.image }} style={styles.image} />
        </View>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={handlePress}
          mode="contained"
        >
          View
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "900",
    fontSize: 24,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  description: {
    flex: 3,
    marginRight: 10,
  },
  image: {
    flex: 1,
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 10,
    padding: 16,
  },
  fab: {
    position: "absolute",
    margin: 30,
    right: 0,
    bottom: 0,
  },
});

export default PeopleHome;