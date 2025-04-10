import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const [userName, setUserName] = useState('');
  const primaryColor = useThemeColor({ light: '#2e78b7', dark: '#4e98d7' }, 'tint');

  useEffect(() => {
    // Load user data from secure storage
    async function loadUserData() {
      const name = await SecureStore.getItemAsync('userName');
      setUserName(name || 'Circle User');
    }
    loadUserData();
  }, []);

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              console.error('Error signing out:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.profileHeader}>
        <ThemedView style={styles.profileImage}>
          <ThemedText style={styles.profileInitial}>
            {userName.charAt(0).toUpperCase()}
          </ThemedText>
        </ThemedView>
        
        <ThemedText style={styles.userName}>{userName}</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.infoSection}>
        <ThemedText style={styles.sectionTitle}>Account Info</ThemedText>
        
        <ThemedView style={styles.infoItem}>
          <ThemedText style={styles.infoLabel}>Display Name</ThemedText>
          <ThemedText style={styles.infoValue}>{userName}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.infoItem}>
          <ThemedText style={styles.infoLabel}>Account Type</ThemedText>
          <ThemedText style={styles.infoValue}>Standard</ThemedText>
        </ThemedView>
      </ThemedView>
      
      <TouchableOpacity
        style={[styles.signOutButton, { backgroundColor: primaryColor }]}
        onPress={handleSignOut}
      >
        <ThemedText style={styles.signOutButtonText}>Sign Out</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4e98d7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInitial: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  infoLabel: {
    fontSize: 16,
    opacity: 0.7,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  signOutButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 30,
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});