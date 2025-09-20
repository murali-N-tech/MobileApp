import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import { register } from '../../api'; // Make sure this is correctly pointing to your api file
import { saveToken } from '../../utils/storage';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await register({ name, email, password });
      const { token } = response.data;
      await saveToken(token);
      dispatch(loginSuccess({ token }));
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
            Create Account
          </Text>
          <InputField
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
          />
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
          <Button onPress={handleRegister} loading={loading} disabled={loading}>
            Register
          </Button>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="mt-4"
          >
            <Text className="text-center text-blue-600">
              Already have an account? <Text className="font-bold">Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;