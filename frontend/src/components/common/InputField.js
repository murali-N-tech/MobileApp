import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

const InputField = ({ label, icon, value, onChangeText, placeholder, secureTextEntry = false, error }) => {
  return (
    <StyledView className="mb-4 w-full">
      <StyledText className="text-gray-600 mb-1 ml-1">{label}</StyledText>
      <StyledView className="flex-row items-center bg-gray-100 rounded-lg p-3 border border-gray-200">
        <Ionicons name={icon} size={20} color="gray" style={{ marginRight: 10 }} />
        <StyledTextInput
          className="flex-1 text-base text-gray-800"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#9CA3AF"
        />
      </StyledView>
      {error && <StyledText className="text-red-500 text-xs mt-1 ml-1">{error}</StyledText>}
    </StyledView>
  );
};

export default InputField;