import React from 'react';
import Header from '@/components/header';
import Messages from '@/components/messages';
import UpdateSection from '@/components/updates_section';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Updates Section */}
        <UpdateSection />
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