import { useEffect, useState } from "react";
import { Text, ScrollView, StyleSheet, View, Image } from "react-native";
import { Card, Surface, useTheme, IconButton } from "react-native-paper";
import { useRouter } from "expo-router";
import api from "@/api/api";

const IssueCard = ({ title, content, onPress, image }) => {
  const theme = useTheme();
  return (
    <Card onPress={onPress} style={styles.cardContainer}>
      <Card.Title
        title={title}
        titleStyle={styles.cardTitle}
        right={(props) => (
          <IconButton {...props} icon="chevron-right" onPress={onPress} />
        )}
      />
      <Card.Content>
        <Text style={[styles.cardContent, { color: theme.colors.primary }]}>
          {content}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default function Page1() {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/issues`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView>
      <Surface style={styles.container}>
        <Text style={styles.title}>Public Grievances</Text>
        {data.map((item) => (
          <IssueCard
            key={item.id}
            title={item.issue_type}
            content={item.description}
            onPress={() =>
              router.push({
                pathname: "/MakeTender",
                params: { issue: JSON.stringify(item) },
              })
            }
          />
        ))}
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  cardContainer: {
    padding: 10,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cardContent: {
    fontSize: 16,
  },
});