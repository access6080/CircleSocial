import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MessageCard from './message_card'

// Sample data array for messages
const messagesData = [
  {
    id: '1',
    title: 'Family',
    message: 'Hey everyone, are we still on for dinner this weekend?',
    date: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    isCircle: true
  },
  {
    id: '2',
    title: 'Work Team',
    message: 'The project deadline has been extended to next Friday. Please update your schedules accordingly.',
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    image: null,
    isCircle: true
  },
  {
    id: '3',
    title: 'John Smith',
    message: 'Can you send me the report we discussed yesterday?',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    image: null,
    isCircle: false
  },
  {
    id: '4',
    title: 'Book Club',
    message: 'Our next meeting will be on Wednesday at 7pm. We\'ll be discussing "The Midnight Library".',
    date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    image: null,
    isCircle: true
  },
  {
    id: '5',
    title: 'Sarah Johnson',
    message: 'Thanks for the birthday wishes!',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    isCircle: false
  },
  {
    id: '6',
    title: 'Hiking Group',
    message: 'Weather looks good for this weekend\'s hike. Don\'t forget to bring water and snacks!',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    image: null,
    isCircle: true
  },
  {
    id: '7',
    title: 'Michael Chen',
    message: 'I found that restaurant we were talking about. Want to check it out next week?',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    isCircle: false
  },
  {
    id: '8',
    title: 'Apartment Neighbors',
    message: 'Reminder: Building maintenance this Thursday from 10am-2pm.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    image: null,
    isCircle: true
  },
  {
    id: '9',
    title: 'Emily Wilson',
    message: 'Hey! Are you free to catch up over coffee sometime this week?',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    image: 'https://randomuser.me/api/portraits/women/17.jpg',
    isCircle: false
  },
  {
    id: '10',
    title: 'Tech Support',
    message: 'Your ticket #45872 has been resolved. Please let us know if you need further assistance. Please let us know if you need further assistance. Please let us know if you need further assistance.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 2 weeks ago
    image: null,
    isCircle: true
  }
];

const Messages = () => {
  return (
    <View style={styles.container}>
      {messagesData.map((item) => (
        <MessageCard 
          key={item.id}
          id={item.id}
          title={item.title}
          message={item.message}
          date={item.date}
          image={item.image}
          isCircle={item.isCircle}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "semibold",
    fontFamily: "Roboto",
    padding: 10
  },
  container: {
    width: "100%",
    marginTop: 10
  }
})

export default Messages