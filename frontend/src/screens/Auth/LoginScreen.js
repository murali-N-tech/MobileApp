import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import { login } from '../../api'; // Make sure this is correctly pointing to your api file
import { saveToken } from '../../utils/storage';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await login(email, password);
      const { token } = response.data;
      await saveToken(token);
      dispatch(loginSuccess({ token }));
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center items-center p-6"
      >
        <View className="w-full max-w-sm">
          <Text className="text-4xl font-extrabold text-gray-800 text-center mb-8">
            Welcome Back!
          </Text>
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="you@example.com"
          />
          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="********"
          />
          {error ? <Text className="text-red-500 text-center mb-4">{error}</Text> : null}
          <Button onPress={handleLogin} loading={loading} disabled={loading}>
            Login
          </Button>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            className="mt-4"
          >
            <Text className="text-center text-blue-600">
              Don't have an account? <Text className="font-bold">Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;