import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

const InputField = ({ label, className, error, ...props }) => {
  const inputClasses = twMerge(
    'border border-gray-300 p-3 rounded-lg w-full bg-gray-50',
    error && 'border-red-500',
    className,
  );

  return (
    <View className="w-full mb-4">
      {label && <Text className="text-gray-700 mb-1">{label}</Text>}
      <TextInput
        className={inputClasses}
        placeholderTextColor="#6B7280"
        {...props}
      />
      {error && <Text className="text-red-500 mt-1 text-xs">{error}</Text>}
    </View>
  );
};

export default InputField;