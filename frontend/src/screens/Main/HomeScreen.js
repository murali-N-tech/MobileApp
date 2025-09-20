import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, SafeAreaView, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { getSports } from '../../api';

const HomeScreen = () => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await getSports();
        setSports(response.data);
      } catch (error) {
        console.error("Failed to fetch sports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSports();
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.card, styles.shadow]}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E40AF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose a Sport</Text>
        <FlatList
          data={sports}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={<Text style={styles.emptyText}>No sports available.</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // bg-gray-100
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  header: {
    paddingVertical: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937', // text-gray-800
    marginBottom: 24,
  },
  card: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  cardDescription: {
    color: '#4B5563', // text-gray-600
    marginTop: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280', // text-gray-500
  },
});

export default HomeScreen;