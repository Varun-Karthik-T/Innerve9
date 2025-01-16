import * as React from 'react';
import { Card, Text, Avatar, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { View, StyleSheet } from 'react-native';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#16a085',
    accent: '#16a085',
  },
};

const LoginPortals = () => (
  <PaperProvider theme={theme}>
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <Card onPress={() => router.push('/contractBottom')} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Avatar.Icon size={48} icon="account" style={styles.icon} color="white" />
            <Text variant="titleLarge" style={styles.cardText}>Contractor</Text>
            <Text variant="bodyMedium" style={styles.cardText}>Contractor login</Text>
          </Card.Content>
        </Card>
        <Card onPress={() => router.push('/peopleBottom')} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Avatar.Icon size={48} icon="account-group" style={styles.icon} color="white" />
            <Text variant="titleLarge" style={styles.cardText}>People</Text>
            <Text variant="bodyMedium" style={styles.cardText}>People Login</Text>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.bottomHalf}>
        <Card onPress={() => router.push('/gov')} style={styles.fullWidthCard}>
          <Card.Content style={styles.cardContent}>
            <Avatar.Icon size={48} icon="city" style={styles.icon} color="white" />
            <Text variant="titleLarge" style={styles.cardText}>Government</Text>
            <Text variant="bodyMedium" style={styles.cardText}>Government login</Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  </PaperProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalf: {
    flex: 1,
    flexDirection: 'row',
  },
  bottomHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
  },
  fullWidthCard: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    width: '95%', // Make the card span the full width
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  cardText: {
    textAlign: 'center',
  },
  icon: {
    marginBottom: 10,
  },
});

export default LoginPortals;