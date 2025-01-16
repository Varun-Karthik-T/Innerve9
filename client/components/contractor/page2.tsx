import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Card } from "react-native-paper";
import { useRouter } from "expo-router";
import axios from "axios"; // Import Axios
import config from "@/app/config";

interface MyComponentProps {
  title: string;
  content: string;
  onPress: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({
  title,
  content,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <Card>
      <Card.Content>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardContent}>{content}</Text>
      </Card.Content>
    </Card>
  </TouchableOpacity>
);

const CardWithMargin = ({ children }) => (
  <View style={styles.cardContainer}>{children}</View>
);

export default function Page2() {
  const [data, setData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(""); // Add error state
  const router = useRouter();

  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        // Replace with your server's IP address and endpoint
        const response = await axios.get(`http://${config.ipAddress}:4000/contracts`);
        setData(response.data); // Set the data from the response
      } catch (error) {
        setError("Failed to fetch data"); // Set error message
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchData(); // Call the async function
  }, []);

  // Show loading message while data is being fetched
  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  // Show error message if the request fails
  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Contracts</Text>
      {data.map((item) => (
        <CardWithMargin key={item.referenceId}>
          <MyComponent
            title={item.organisationChain}
            content={item.referenceId}
            onPress={() =>
              router.push({
                pathname: "/ContractDesc",
                params: { contract: JSON.stringify(item) },
              })
            }
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
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2c3e50",
  },
  cardContainer: {
    margin: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  cardContent: {
    fontSize: 16,
    color: "#16a085",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#2c3e50",
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "red",
  },
});
