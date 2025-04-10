import Header from '@/components/header';
import RecentMessages from '@/components/recent_messages';
import UpdateSection from '@/components/updates_section';
import {Text, SafeAreaView, ScrollView } from 'react-native';


export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Header />
      
      <ScrollView>
        {/* Updates Section */}
        <UpdateSection />
        {/* Recent Messages */}
        <RecentMessages />
      </ScrollView>
    </SafeAreaView>
  )
};