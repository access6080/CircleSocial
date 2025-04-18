import React from 'react';
import Header from '@/components/header';
import Messages from '@/components/messages';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PinnedChat from '@/components/pinned_chat';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Pinned Chat Section */}
        <PinnedChat />
        {/* Recent Messages */}
        <Messages />
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up entire screen
  },
  scrollView: {
    flex: 1, // Take remaining space after Header
  },
  scrollContent: {
    paddingBottom: 50, // Add some padding at the bottom for better UX
  }
});