import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { registerSuccess, registerFailure, registerStart } from '../../redux/slices/authSlice';
import api from '../../api';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleRegister = async () => {
    dispatch(registerStart());
    try {
      const { data } = await api.register(username, email, password);
      // 👇 ** DISPATCH THE NEW ACTION ** 👇
      dispatch(registerSuccess({ user: data.user, token: data.token }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred during registration.';
      dispatch(registerFailure(errorMessage));
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <InputField placeholder="Username" value={username} onChangeText={setUsername} />
      <InputField placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <InputField placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
      textAlign: 'center',
    },
});

export default RegisterScreen;