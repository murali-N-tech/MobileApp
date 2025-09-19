import React, { useState } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import { loginSuccess, authError, setLoading } from '../../redux/slices/authSlice';
import { saveToken } from '../../utils/storage';
import axiosInstance from '../../api/axiosConfig';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);

const RegisterScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        dispatch(setLoading(true));
        try {
            const response = await axiosInstance.post('/users', { name, email, password });
            const { token } = response.data;
            await saveToken(token);
            dispatch(loginSuccess({ token }));
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
            dispatch(authError(errorMessage));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <StyledSafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 justify-center items-center p-6"
            >
                <StyledText className="text-4xl font-bold text-blue-500 mb-2">Create Account</StyledText>
                <StyledText className="text-lg text-gray-500 mb-8">Start your journey with us</StyledText>

                {error && <StyledText className="text-red-500 mb-4">{error}</StyledText>}

                <InputField
                    label="Full Name"
                    icon="person-outline"
                    value={name}
                    onChangeText={setName}
                    placeholder="Your full name"
                />
                <InputField
                    label="Email"
                    icon="mail-outline"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="youremail@example.com"
                />
                <InputField
                    label="Password"
                    icon="lock-closed-outline"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Create a password"
                    secureTextEntry
                />
                
                <Button title="Sign Up" onPress={handleRegister} isLoading={isLoading} style={{ width: '100%', marginTop: 20 }}/>

                <StyledView className="flex-row mt-6">
                    <StyledText className="text-gray-500">Already have an account? </StyledText>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <StyledText className="text-blue-500 font-bold">Log In</StyledText>
                    </TouchableOpacity>
                </StyledView>
            </KeyboardAvoidingView>
        </StyledSafeAreaView>
    );
};

export default RegisterScreen;