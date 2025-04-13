import React from 'react';
import { Stack } from 'expo-router';

export default function ChatLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // This provides a smooth animation when transitioning between screens
        animation: 'slide_from_right',
      }}
    />
  );
}