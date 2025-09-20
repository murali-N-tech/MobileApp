import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { getSports } from '../../api'; // Make sure this is correctly pointing to your api file

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
    <View className="bg-white p-6 rounded-xl shadow-md mb-4 mx-4">
      <Text className="text-xl font-bold text-gray-800">{item.name}</Text>
      <Text className="text-gray-600 mt-2">{item.description}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#1E40AF" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="py-6">
        <Text className="text-3xl font-bold text-center text-gray-800 mb-6">
          Choose a Sport
        </Text>
        <FlatList
          data={sports}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={<Text className="text-center text-gray-500">No sports available.</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;