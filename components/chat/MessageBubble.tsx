import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

type MessageBubbleProps = {
  message: string;
  timestamp: Date;
  isSent: boolean;
};

const MessageBubble = ({ message, timestamp, isSent }: MessageBubbleProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Format timestamp as HH:MM
  const formattedTime = format(timestamp, 'h:mm a');
  
  return (
    <View style={[
      styles.container,
      isSent ? styles.sentContainer : styles.receivedContainer
    ]}>
      <View style={[
        styles.bubble,
        isSent 
          ? [styles.sentBubble, { backgroundColor: Colors['light'].tint }] 
          : [styles.receivedBubble, { backgroundColor: isDark ? '#3A3A3C' : '#E9E9EB' }]
      ]}>
        <Text style={[
          styles.messageText,
          { color: isSent ? '#FFF' : isDark ? '#FFF' : '#000' }
        ]}>
          {message}
        </Text>
      </View>
      <Text style={[
        styles.timestamp, 
        { color: isDark ? '#8E8E93' : '#8E8E93' }
      ]}>
        {formattedTime}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    maxWidth: '80%',
  },
  sentContainer: {
    alignSelf: 'flex-end',
    marginRight: 8,
    alignItems: 'flex-end',
  },
  receivedContainer: {
    alignSelf: 'flex-start',
    marginLeft: 8,
    alignItems: 'flex-start',
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 2,
  },
  sentBubble: {
    borderTopRightRadius: 4,
  },
  receivedBubble: {
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 2,
    marginHorizontal: 4,
  },
});

export default MessageBubble;