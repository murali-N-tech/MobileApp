import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logoutSuccess, setLoading } from '../redux/slices/authSlice';
import { getToken } from '../utils/storage';
import { ActivityIndicator, View } from 'react-native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

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
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isAuthenticated ? <AppStack /> : <AuthStack />;
};

export default RootNavigator;