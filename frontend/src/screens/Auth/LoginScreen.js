import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import { login } from '../../api';
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Welcome Back!</Text>
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
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Button title="Login" onPress={handleLogin} disabled={loading} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.registerButton}
          >
            <Text style={styles.registerText}>
              Don't have an account? <Text style={styles.registerLink}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 384,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 32,
  },
  errorText: {
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  registerButton: {
    marginTop: 16,
  },
  registerText: {
    textAlign: 'center',
    color: '#2563EB',
  },
  registerLink: {
    fontWeight: 'bold',
  },
});

export default LoginScreen;