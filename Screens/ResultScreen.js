import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ResultScreen = ({ navigation, route }) => {
  const { correctAnswers, wrongAnswers } = route.params;
  const totalQuestions = correctAnswers + wrongAnswers;
  const percentageCorrect = ((correctAnswers / totalQuestions) * 100).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Your Result</Text>
      <View style={styles.resultContainer}>
        <Text style={styles.resultItem}>Correct Answers: {correctAnswers}</Text>
        <Text style={styles.resultItem}>Wrong Answers: {wrongAnswers}</Text>
        <Text style={styles.resultItem}>Total Questions: {totalQuestions}</Text>
        <Text style={styles.resultItem}>
          Percentage Correct: {percentageCorrect}%
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  resultText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  resultItem: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResultScreen;
