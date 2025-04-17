import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageList, { Message } from '@/components/chat/MessageList';
import ChatInput from '@/components/chat/ChatInput';

export default function ChatScreen() {
  const { chatId, title, image } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  
  // Mock messages data - in a real app this would come from an API or database
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey! How are you?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isSent: false,
    },
    {
      id: '2',
      text: "I'm good, thanks! How about you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
      isSent: true,
    },
    {
      id: '3',
      text: 'Doing well! Just wanted to check in.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
      isSent: false,
    },
    {
      id: '4',
      text: 'Are we still on for dinner this weekend?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isSent: false,
    },
    {
      id: '5',
      text: 'Yes! Looking forward to it.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      isSent: true,
    },
    {
      id: '6',
      text: 'Doing well! Just wanted to check in.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
      isSent: false,
    },
    {
      id: '7',
      text: 'Are we still on for dinner this weekend?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isSent: false,
    },
    {
      id: '8',
      text: 'Yes! Looking forward to it.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      isSent: true,
    },
    {
      id: '9',
      text: 'Doing well! Just wanted to check in.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
      isSent: false,
    },
    {
      id: '10',
      text: 'Are we still on for dinner this weekend?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isSent: false,
    },
    {
      id: '11',
      text: 'Yes! Looking forward to it.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      isSent: true,
    },
    {
      id: '12',
      text: 'Doing well! Just wanted to check in.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
      isSent: false,
    },
    {
      id: '13',
      text: 'Are we still on for dinner this weekend?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isSent: false,
    },
    {
      id: '14',
      text: 'Yes! Looking forward to it.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      isSent: true,
    },
    {
      id: '15',
      text: 'Doing well! Just wanted to check in.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
      isSent: false,
    },
    {
      id: '16',
      text: 'Are we still on for dinner this weekend?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isSent: false,
    },
    {
      id: '17',
      text: 'Yes! Looking forward to it.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      isSent: true,
    },
  ]);
  
  // Function to handle sending new messages
  const handleSendMessage = (messageText: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      timestamp: new Date(),
      isSent: true,
    };
    
    setMessages(prevMessages => [newMessage, ...prevMessages,]);
    
    // In a real app, you'd send the message to your backend here
  };
  
  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background }
    ]}>
      
      <ChatHeader 
        title={title as string} 
        image={image ? image as string : null} 
      />
      
      <MessageList messages={messages} />
      
      <ChatInput onSend={handleSendMessage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});