// frontend/src/components/common/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

const Button = ({ title, onPress, className, textClassName }) => {
  const buttonClasses = twMerge(
    'bg-blue-500',
    'py-2',
    'px-4',
    'rounded',
    className
  );

  const textClasses = twMerge(
    'text-white',
    'font-bold',
    'text-center',
    textClassName
  );

  return (
    <TouchableOpacity onPress={onPress} className={buttonClasses}>
      <Text className={textClasses}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;