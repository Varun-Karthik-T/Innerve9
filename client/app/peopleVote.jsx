import { useEffect, useState } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import {
  Card,
  Text,
  Button,
  Surface,
  Divider,
  useTheme,
  Chip,
} from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import api from "@/api/api";

const PeopleVote = () => {
  const { issue } = useLocalSearchParams();
  const parsedIssue = JSON.parse(Array.isArray(issue) ? issue[0] : issue);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionType, setSubmissionType] = useState("");

  const theme = useTheme();

  useEffect(() => {
    const fetchVoteStatus = async () => {
      try {
        const response = await api.get("/vote-status", {
          params: {
            userId: "1",
            issueId: parsedIssue.id,
          },
        });

        const { voted } = response.data;
        console.log("Voted:", voted);
        if (voted) {
          setIsSubmitted(true);
          setSubmissionType(voted.toLowerCase());
        }
      } catch (error) {
        console.error("Error fetching vote status:", error);
      }
    };

    fetchVoteStatus();
  }, [parsedIssue.id]);

  const handleVote = async (voteType) => {
    try {
      const response = await api.post("4000/vote", {
        issueId: String(parsedIssue.id),
        userId: "1",
        voteType,
      });

      console.log(response.data);
      setIsSubmitted(true);
      setSubmissionType(voteType);
    } catch (error) {
      console.error("Error submitting vote:", error);
      Alert.alert(
        "Error",
        "There was an error submitting your vote. Please try again."
      );
    }
  };

  const handleApprove = () => {
    Alert.alert(
      "Confirm Approval",
      "Are you sure you want to approve this issue?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Approve",
          onPress: () => handleVote("approve"),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeny = () => {
    Alert.alert(
      "Confirm Denial",
      "Are you sure you want to deny this issue?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Deny",
          onPress: () => handleVote("deny"),
        },
      ],
      { cancelable: false }
    );
  };

  const styles = StyleSheet.create({
    error: {
      backgroundColor: theme.colors.errorContainer,
      margin: 12,
      paddingVertical: 12,
      borderRadius: 8,
    },
    container: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginVertical: 8,
    },
    description: {
      fontSize: 16,
      paddingHorizontal: 8,
      lineHeight: 32,
      textAlign: "justify",
      fontStyle: "italic",
      marginBottom: 16,
    },
    image: {
      width: "100%",
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
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 16,
    },
    button: {
      marginHorizontal: 8,
    },
    notVotable: {
      fontSize: 16,
      color: "red",
      marginTop: 16,
      textAlign: "center",
    },
    chips: {
      flexDirection: "row",
      gap: 4,
      flexWrap: "wrap",
    },
    cardCover: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  });

  return (
    <Surface style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover
          source={{ uri: parsedIssue.image }}
          style={styles.cardCover}
        />
        <Card.Title title={parsedIssue.issue_type} titleStyle={styles.title} />
        <Card.Content>
          <Text style={styles.description}>{parsedIssue.description}</Text>
          <Divider bold={true} />
          <View style={styles.chips}>
            <Chip style={styles.date}>{parsedIssue.date_of_complaint}</Chip>
            <Chip
              icon={
                parsedIssue.status == "pending" ? "progress-clock" : "check"
              }
              style={styles.status}
            >
              {parsedIssue.status == "pending" ? "Pending" : "Resolved"}
            </Chip>
          </View>
        </Card.Content>
        {parsedIssue.votable ? (
          <Card.Actions style={styles.buttonContainer}>
            {!isSubmitted ? (
              <>
                <Button
                  mode="contained"
                  onPress={handleApprove}
                  style={styles.button}
                >
                  Approve
                </Button>
                <Button
                  mode="contained"
                  onPress={handleDeny}
                  style={styles.button}
                >
                  Deny
                </Button>
              </>
            ) : (
              <Button mode="contained" disabled style={styles.button}>
                {submissionType === "approve" ? "Approved" : "Denied"}
              </Button>
            )}
          </Card.Actions>
        ) : (
          <Surface style={styles.error}>
            <Text style={styles.notVotable}>
              You are not within the voting range for this issue.
            </Text>
          </Surface>
        )}
      </Card>
    </Surface>
  );
};

export default PeopleVote;
