import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/redux/store';
import { loginSuccess, logoutSuccess, setLoading } from './src/redux/slices/authSlice';
import { getToken } from './src/utils/storage';
import { ActivityIndicator, View } from 'react-native';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
import { StatusBar } from 'expo-status-bar';

// This component will handle the logic to show the correct stack
const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      dispatch(setLoading(true));
      const token = await getToken();
      if (token) {
        dispatch(loginSuccess({ token }));
      } else {
        dispatch(logoutSuccess());
      }
      setIsAppLoading(false);
      dispatch(setLoading(false));
    };
    checkToken();
  }, [dispatch]);

  if (isAppLoading || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
        <StatusBar style="dark" />
        <RootNavigator />
    </Provider>
  );
}