import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../components/common/Button';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../../redux/slices/authSlice';
import { deleteToken } from '../../utils/storage';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);

const HomeScreen = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await deleteToken();
        dispatch(logoutSuccess());
    };

    return (
        <StyledSafeAreaView className="flex-1 bg-gray-50">
            <StyledView className="flex-1 justify-center items-center p-6">
                <StyledText className="text-3xl font-bold text-gray-800 mb-4">Home Screen</StyledText>
                <StyledText className="text-center text-gray-600 mb-8">
                    Welcome to the main application. This is where you'll select a sport and start your qualification.
                </StyledText>
                <Button title="Logout" onPress={handleLogout} style={{ width: '100%' }} />
            </StyledView>
        </StyledSafeAreaView>
    );
};

export default HomeScreen;