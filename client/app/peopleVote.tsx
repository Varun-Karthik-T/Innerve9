import * as React from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import config from './config';

const PeopleVote = () => {
  const { issue } = useLocalSearchParams();
  const parsedIssue = JSON.parse(Array.isArray(issue) ? issue[0] : issue);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submissionType, setSubmissionType] = React.useState(''); // 'approve' or 'deny'

  React.useEffect(() => {
    const fetchVoteStatus = async () => {
      try {
        const response = await axios.get(`http://${config.ipAddress}:4000/vote-status`, {
          params: {
            userId: '1', // Hardcoded user ID
            issueId: parsedIssue.id,
          },
        });
        
        const { voted } = response.data;
        console.log('Voted:', voted);
        if (voted) {
          setIsSubmitted(true);
          setSubmissionType(voted.toLowerCase());
        }
      } catch (error) {
        console.error('Error fetching vote status:', error);
      }
    };

    fetchVoteStatus();
  }, [parsedIssue.id]);

  const handleVote = async (voteType: 'approve' | 'deny') => {
    try {
      const response = await axios.post(`http://${config.ipAddress}:4000/vote`, {
        issueId: String(parsedIssue.id),
        userId: '1', // Hardcoded user ID
        voteType,
      });

      console.log(response.data);
      setIsSubmitted(true);
      setSubmissionType(voteType);
    } catch (error) {
      console.error('Error submitting vote:', error);
      Alert.alert('Error', 'There was an error submitting your vote. Please try again.');
    }
  };

  const handleApprove = () => {
    Alert.alert(
      'Confirm Approval',
      'Are you sure you want to approve this issue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Approve',
          onPress: () => handleVote('approve'),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeny = () => {
    Alert.alert(
      'Confirm Denial',
      'Are you sure you want to deny this issue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Deny',
          onPress: () => handleVote('deny'),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>{parsedIssue.issue_type}</Text>
          <Text style={styles.description}>{parsedIssue.description}</Text>
          <Image source={{ uri: parsedIssue.image }} style={styles.image} />
          <Text style={styles.date}>Date of Complaint: {parsedIssue.date_of_complaint}</Text>
          <Text style={styles.status}>Status: {parsedIssue.status}</Text>
        </Card.Content>
        {parsedIssue.votable ? (
          <Card.Actions style={styles.buttonContainer}>
            {!isSubmitted ? (
              <>
                <Button mode="contained" onPress={handleApprove} style={styles.button}>Approve</Button>
                <Button mode="contained" onPress={handleDeny} style={styles.button}>Deny</Button>
              </>
            ) : (
              <Button mode="contained" disabled style={styles.button}>
                {submissionType === 'approve' ? 'Approved' : 'Denied'}
              </Button>
            )}
          </Card.Actions>
        ) : (
          <Text style={styles.notVotable}>You are not within the voting range for this issue.</Text>
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginVertical: 8,
    padding: 16, // Increase padding for the Card component
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    borderRadius: 8,
  },
  date: {
    fontSize: 16,
    marginVertical: 8,
  },
  status: {
    fontSize: 16,
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  button: {
    marginHorizontal: 8,
  },
  notVotable: {
    fontSize: 16,
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default PeopleVote;