import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, onPress, className, textClassName, loading, disabled, ...props }) => {
  const buttonClasses = twMerge(
    'py-3 px-4 bg-blue-600 rounded-lg flex-row justify-center items-center my-2',
    disabled && 'bg-gray-400',
    className,
  );

  const textClasses = twMerge(
    'text-white text-center font-bold text-base',
    textClassName,
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={buttonClasses}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className={textClasses}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;