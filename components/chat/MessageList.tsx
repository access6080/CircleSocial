import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MessageBubble from './MessageBubble';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type Message = {
  id: string;
  text: string;
  timestamp: Date;
  isSent: boolean;
};

type MessageListProps = {
  messages: Message[];
};

// List is inverted so messages array should be in from newest (top) to oldest (bottom)
// the first element of messages should be the newest message

const MessageList = ({ messages }: MessageListProps) => {
  const insets = useSafeAreaInsets();
  
  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MessageBubble
          message={item.text}
          timestamp={item.timestamp}
          isSent={item.isSent}
        />
      )}
      contentContainerStyle={[
        styles.listContent,
        { paddingTop: 10, paddingBottom: insets.top + 15 }
      ]}
      inverted={true} // Set to true to reverse the list (newest at bottom)
      style={styles.list}
      showsVerticalScrollIndicator={true}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 10,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});

export default MessageList;