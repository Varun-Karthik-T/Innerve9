import {
  Card,
  Text,
  Avatar,
  Divider,
  Button,
  IconButton,
  Surface
} from "react-native-paper";
import { useRouter } from "expo-router";
import { View, StyleSheet, Image } from "react-native";
import { useState } from "react";
import logo from "@/assets/images/Logo.png"

const LoginPortals = () => {
  const [role, setRole] = useState(0);

  const roles = [
    {
      title: "Contractor",
      route: "contractBottom",
      icon: "account",
    },
    {
      title: "People",
      route: "peopleBottom",
      icon: "account-group",
    },
    {
      title: "Government",
      route: "gov",
      icon: "city",
    },
  ];

  const router = useRouter();

  const handleLeftArrowClick = () => {
    setRole((prevRole) => (prevRole - 1 + roles.length) % roles.length);
  };

  const handleRightArrowClick = () => {
    setRole((prevRole) => (prevRole + 1) % roles.length);
  };

  return (
    <Surface mode="flat" style={styles.container}>
      <View style={styles.titleContainer}>
        <Text variant="displaySmall"> Be part</Text>
        <Text variant="displaySmall"> of a brighter </Text>
        <Text variant="displayLarge" style={{ fontWeight: "900" }}>
          TOMORROW
        </Text>
      </View>
      <Divider style={{ width: "90%" }} bold={true} />
      <Image source={logo} style={{width: 200, height: 200, marginVertical: 12}} />
      <View style={styles.cardHolder}>
        <IconButton
          icon="chevron-left"
          size={32}
          onPress={handleLeftArrowClick}
          style={styles.arrowButton}
        />
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            <Avatar.Icon
              size={48}
              icon={roles[role].icon}
              style={styles.icon}
              color="white"
            />
            <Text variant="titleLarge" style={styles.cardText}>
              {roles[role].title}
            </Text>
            <Button
              style={styles.loginButton}
              mode="contained"
              onPress={() => router.push(`/${roles[role].route}`)}
            >
              {" "}
              Login{" "}
            </Button>
          </Card.Content>
        </Card>
        <IconButton
          icon="chevron-right"
          size={32}
          onPress={handleRightArrowClick}
          style={styles.arrowButton}
        />
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    padding: 8,
  },
  titleContainer: {
    paddingVertical: 16,
    gap: 4,
  },
  cardHolder: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 200,
    margin: 10,
    padding: 16,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  loginButton: {
    marginTop: 20,
  },
  cardText: {
    textAlign: "center",
  },
  icon: {
    marginBottom: 10,
  },
  arrowButton: {
    marginHorizontal: 10,
  },
});

export default LoginPortals;
