import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SubscriptionScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState('');

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Subscription Plan</Text>
      <TouchableOpacity
        style={[styles.plan, selectedPlan === 'Basic' && styles.selectedPlan]}
        onPress={() => handlePlanSelection('Basic')}
      >
        <Text style={styles.planText}>Basic Plan</Text>
        <Text style={styles.planPrice}>$9.99/month</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.plan, selectedPlan === 'Pro' && styles.selectedPlan]}
        onPress={() => handlePlanSelection('Pro')}
      >
        <Text style={styles.planText}>Pro Plan</Text>
        <Text style={styles.planPrice}>$19.99/month</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.plan, selectedPlan === 'Premium' && styles.selectedPlan]}
        onPress={() => handlePlanSelection('Premium')}
      >
        <Text style={styles.planText}>Premium Plan</Text>
        <Text style={styles.planPrice}>$29.99/month</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.subscribeButton}>
        <Text style={styles.subscribeButtonText}>Subscribe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  plan: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  selectedPlan: {
    backgroundColor: '#00bcd4',
  },
  planText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  planPrice: {
    fontSize: 16,
  },
  subscribeButton: {
    backgroundColor: '#00bcd4',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SubscriptionScreen;
