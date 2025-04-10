import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const backgroundColor = useThemeColor({ light: '#fff', dark: '#000' }, 'background');
  const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
  const placeholderColor = useThemeColor({ light: '#999', dark: '#666' }, 'text');
  const primaryColor = useThemeColor({ light: '#2e78b7', dark: '#4e98d7' }, 'tint');

  const handleSignup = async () => {
    // Basic validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you would call your registration API here
      // This is a mock registration for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user token (in a real app, this would come from your backend)
      await SecureStore.setItemAsync('userToken', 'sample-auth-token');
      await SecureStore.setItemAsync('userName', name);
      
      // Navigate to the main app
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Registration Failed', 'Please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ThemedView style={styles.innerContainer}>
        <ThemedText style={styles.title}>Circle Social</ThemedText>
        <ThemedText style={styles.subtitle}>Create a new account</ThemedText>
        
        <TextInput
          style={[styles.input, { color: textColor, backgroundColor: backgroundColor, borderColor: placeholderColor }]}
          placeholder="Full Name"
          placeholderTextColor={placeholderColor}
          value={name}
          onChangeText={setName}
        />
        
        <TextInput
          style={[styles.input, { color: textColor, backgroundColor: backgroundColor, borderColor: placeholderColor }]}
          placeholder="Email"
          placeholderTextColor={placeholderColor}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <TextInput
          style={[styles.input, { color: textColor, backgroundColor: backgroundColor, borderColor: placeholderColor }]}
          placeholder="Password"
          placeholderTextColor={placeholderColor}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TextInput
          style={[styles.input, { color: textColor, backgroundColor: backgroundColor, borderColor: placeholderColor }]}
          placeholder="Confirm Password"
          placeholderTextColor={placeholderColor}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: primaryColor, opacity: isLoading ? 0.7 : 1 }]}
          onPress={handleSignup}
          disabled={isLoading}
        >
          <ThemedText style={styles.buttonText}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.linkContainer}
          onPress={() => router.push('/(auth)/login')}
        >
          <ThemedText style={styles.link}>Already have an account? Login</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 32,
    textAlign: 'center',
    opacity: 0.8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  link: {
    fontSize: 16,
  },
});