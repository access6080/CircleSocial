import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter, useSegments } from 'expo-router';

// Define the auth context type
type AuthContextType = {
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  isLoggedIn: boolean;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that wraps the app
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    async function loadToken() {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        setIsLoggedIn(!!token);
      } catch (e) {
        console.error('Failed to load token', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadToken();
  }, []);

  // Handle routing based on auth state
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isLoggedIn && !inAuthGroup) {
      // If user is not logged in and not in auth group, redirect to login
      router.replace('/(auth)/login');
    } else if (isLoggedIn && inAuthGroup) {
      // If user is logged in and in auth group, redirect to home
      router.replace('/(tabs)');
    }
  }, [isLoggedIn, segments, isLoading, router]);

  // Authentication methods
  const authContext: AuthContextType = {
    signIn: async (token) => {
      await SecureStore.setItemAsync('userToken', token);
      setIsLoggedIn(true);
    },
    signOut: async () => {
      await SecureStore.deleteItemAsync('userToken');
      setIsLoggedIn(false);
    },
    isLoading,
    isLoggedIn,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

// Hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}