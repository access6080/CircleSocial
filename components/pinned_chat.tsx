import { View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import PinnedChatCircle from './update_circle'
import { useRouter } from 'expo-router';

interface Chat {
    id: string
    imageUrl: string
    name: string
}
// Mock data for demonstration
const pinnedChats = [
  { id: '1', imageUri: 'https://randomuser.me/api/portraits/men/32.jpg', name: 'John', seen: false },
  { id: '2', imageUri: 'https://randomuser.me/api/portraits/women/44.jpg', name: 'Sarah', seen: true },
  { id: '3', imageUri: 'https://randomuser.me/api/portraits/men/79.jpg', name: 'Mike', seen: false },
  { id: '4', imageUri: 'https://randomuser.me/api/portraits/women/68.jpg', name: 'Emma', seen: true },
  { id: '5', imageUri: 'https://randomuser.me/api/portraits/men/91.jpg', name: 'David', seen: false },
  { id: '6', imageUri: 'https://randomuser.me/api/portraits/women/22.jpg', name: 'Lisa', seen: true },
  { id: '7', imageUri: 'https://randomuser.me/api/portraits/men/45.jpg', name: 'Tom', seen: false },
  { id: '8', imageUri: 'https://randomuser.me/api/portraits/women/56.jpg', name: 'Anna', seen: true },
  { id: '9', imageUri: 'https://randomuser.me/api/portraits/men/67.jpg', name: 'Jake', seen: false },
];

const PinnedChat = () => {
  const CIRCLE_SIZE = 100; // Adjusted size to fit better in a 3x3 grid
  const screenWidth = Dimensions.get('window').width;
  const gridItemWidth = (screenWidth - 40) / 3; // 40 = padding (20px on each side) 
  const router = useRouter()

  const handlePress = (chat: Chat) => {
    
}


  return (
    <View style={styles.container}>
      {pinnedChats.map((chat) => (
        <View key={chat.id} style={[styles.gridItem, { width: gridItemWidth }]}>
          <PinnedChatCircle
            imageUri={chat.imageUri}
            name={chat.name}
            size={CIRCLE_SIZE}
            seen={chat.seen}
            onPress={() => router.push({
                pathname: `/chat/[chatId]`,
                params: { 
                    chatId: chat.id,
                    title: chat.name, 
                    image: chat.imageUri || ''
                }})
            }
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
  },
  gridItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    height: 120, // Fixed height for each grid item
  }
});

export default PinnedChat