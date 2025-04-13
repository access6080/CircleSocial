import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import MessageCard from '@/components/message_card';
import StoryCircle from '@/components/update_circle';
import SearchResultPeopleCircle from '@/components/SearchResultPeopleCircle';
import { ensureAllFilters, FilterType } from '@/types';

// Add sample data for updates
const UPDATES = [
  { id: 'u1', name: 'Sarah', image: 'https://randomuser.me/api/portraits/women/32.jpg', seen: false },
  { id: 'u2', name: 'Mike', image: 'https://randomuser.me/api/portraits/men/32.jpg', seen: false },
  { id: 'u3', name: 'Emma', image: 'https://randomuser.me/api/portraits/women/31.jpg', seen: true },
  { id: 'u4', name: 'James', image: 'https://randomuser.me/api/portraits/men/31.jpg', seen: true },
  { id: 'u5', name: 'Alex', image: 'https://randomuser.me/api/portraits/men/30.jpg', seen: true },
];

const CIRCLES = [
    { id: 'c1', title: 'Family Circle', image: null },
    { id: 'c2', title: 'Work Team', image: null },
    { id: 'c3', title: 'Book Club', image: null },
  ];
  
const MESSAGES = [
    {
      id: 'm1',
      title: 'Family',
      message: 'Hey everyone, are we still on for dinner this weekend?',
      date: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      isCircle: true
    },
    {
      id: 'm2',
      title: 'Work Team',
      message: 'The project deadline has been extended to next Friday. Please update your schedules accordingly.',
      date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      image: null,
      isCircle: true
    },
    {
      id: 'm3',
      title: 'Francis Bean',
      message: 'The project deadline has been extended to next Friday. Please update your schedules accordingly.',
      date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      image: null,
      isCircle: false
    },
  ];

const PEOPLE = [
    { id: '1', name: 'John Doe', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: '2', name: 'Jane Smith', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: '3', name: 'Mike Johnson', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: '4', name: 'Sarah Williams', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  ];

// ...keep existing PEOPLE, CIRCLES, MESSAGES data...

const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const router = useRouter();
    const colorScheme = useColorScheme();
    const filters = ensureAllFilters(['all', 'circles', 'messages', 'people', 'updates'])

  const filteredPeople = PEOPLE.filter(person => 
    searchText.length > 0 && person.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredCircles = CIRCLES.filter(circle => 
    searchText.length > 0 && circle.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredMessages = MESSAGES.filter(msg => 
    searchText.length > 0 && (
      msg.title.toLowerCase().includes(searchText.toLowerCase()) || 
      msg.message.toLowerCase().includes(searchText.toLowerCase())
    )
  );
  
  const filteredUpdates = UPDATES.filter(update =>
    searchText.length > 0 && update.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Navigate to chat based on item type
  const navigateToChat = (item: any, isCircle: boolean = false) => {
    const name = isCircle ? item.title : item.name;
    
    router.push({
      pathname: `/chat/[chatId]`,
      params: { 
        chatId: item.id,
        title: name, 
        image: item.image || ''
      }
    });
  };

    //  Render update item in horizontal list
  const renderUpdateItem = ({ item }: { item: any }) => (
    <Pressable 
      style={styles.updateItem}
      onPress={() => navigateToChat(item)}
    >
      <StoryCircle
        imageUri={item.image}
        name={item.name}
        size={65}
        seen={item.seen}
        borderWidth={3}
      />
    </Pressable>
  );

  const showUpdateSearchResult = activeFilter === 'all' || activeFilter === 'updates'
  const showPeopleSearchResult = activeFilter === 'all' || activeFilter === 'people'
  const showCircleSearchResult = activeFilter === 'all' || activeFilter == "circles"
  const showMessageSearchResult = activeFilter === 'all' || activeFilter == "messages"

  const RenderSearchResult = () => {
    return (
        <ScrollView 
          style={styles.resultsContainer}
          keyboardShouldPersistTaps="handled"
        >
            {/* Updates Section  */}
            {showUpdateSearchResult && filteredUpdates.length > 0 && (
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                    Updates
                    </Text>
                    <FlatList
                      data={filteredUpdates}
                      keyboardShouldPersistTaps="handled"
                      renderItem={renderUpdateItem}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={item => `update-${item.id}`}
                      contentContainerStyle={styles.updatesContainer}
                    />
                </View>
            )}
            {/* People Section */}
            {showPeopleSearchResult && filteredPeople.length > 0 && (
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                    People
                    </Text>
                    <FlatList
                        data={filteredPeople}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                            <SearchResultPeopleCircle
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                onPress={() => navigateToChat(item)}
                            />
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => `person-${item.id}`}
                        contentContainerStyle={styles.peopleListContainer}
                    />
                </View>
            )}
            {/* Cirlce Section */}
            {showCircleSearchResult && filteredCircles.length > 0 && (
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                    Circles
                    </Text>

                    <FlatList
                        data={filteredCircles}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                            <SearchResultPeopleCircle
                                id={item.id}
                                name={item.title}
                                image={item.image}
                                isCircle
                                onPress={() => navigateToChat(item, true)}
                            />
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => `person-${item.id}`}
                        contentContainerStyle={styles.peopleListContainer}
                    /> 
                </View>
            )}
            {/* Messages Section */}
            {showMessageSearchResult && filteredMessages.length > 0 && (
                <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Messages
                </Text>
                <View style={styles.messagesContainer}>
                  {filteredMessages.map(message => (
                    <MessageCard
                      key={`message-${message.id}`}
                      id={message.id}
                      title={message.title}
                      message={message.message}
                      date={message.date}
                      image={message.image}
                      isCircle={message.isCircle}
                    />
                  ))}
                </View>
              </View>
            )}
        </ScrollView>
    )

  }

  // Keep the existing search header and filter tabs code...
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        {/* ...existing search header code... */}
        <View style={[
          styles.searchInputContainer,
          { backgroundColor: Colors[colorScheme ?? 'light'].card }
        ]}>
          <IconSymbol 
            name="magnifyingglass" 
            color={Colors[colorScheme ?? 'light'].text} 
            size={20}
          />
          <TextInput
            style={[
              styles.searchInput,
              { color: Colors[colorScheme ?? 'light'].text }
            ]}
            placeholder="Search..."
            placeholderTextColor={colorScheme === 'dark' ? '#8E8E93' : '#C7C7CC'}
            value={searchText}
            onChangeText={setSearchText}
            autoFocus={true}
          />
          {searchText.length > 0 && (
            <Pressable onPress={() => setSearchText('')}>
              <View style={[styles.clearButton, { backgroundColor: colorScheme === 'dark' ? '#3A3A3C' : '#D1D1D6' }]}>
                <IconSymbol name="xmark" size={12} color={colorScheme === 'dark' ? '#FFFFFF' : '#000000'} />
              </View>
            </Pressable>
          )}
        </View>
        
        <Pressable onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={{ color: Colors[colorScheme ?? 'light'].tint }}>Cancel</Text>
        </Pressable>
      </View>

      {/* Filter Tabs - KEEP THE EXISTING CODE */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal keyboardShouldPersistTaps="handled" showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {filters.map((filter, i) => 
            <Pressable
              style={[
                styles.filterTab,
                activeFilter === filter && { 
                  backgroundColor: Colors[colorScheme ?? 'light'].tint 
                },
                activeFilter !== filter && { 
                  backgroundColor: 'rgba(120, 120, 128, 0.16)' 
                }
              ]}
              key={i}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === filter && { 
                  color: colorScheme === 'dark' ? Colors.dark.background : '#FFFFFF' 
                },
                activeFilter !== filter && { 
                  color: Colors[colorScheme ?? 'light'].text 
                }
              ]}>{filter.charAt(0).toUpperCase() + filter.slice(1)}</Text>
            </Pressable>
          )}
        </ScrollView>
      </View>

      {/* SECTIONED SEARCH RESULTS */}
      {searchText.length > 0 ? (
        <RenderSearchResult />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Search for people, circles, updates or messages
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Keep existing styles
  container: {
    flex: 1,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    height: '100%',
  },
  cancelButton: {
    paddingVertical: 8,
  },
  filterContainer: {
    paddingTop: 5,
    paddingBottom: 10,
  },
  filterScroll: {
    paddingHorizontal: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: 'rgba(120, 120, 128, 0.16)',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  personCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  personName: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
    flex: 1,
  },
  circleIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4e98d7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.6,
  },
  
  // Add new styles for sections
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  updatesContainer: {
    paddingVertical: 5,
  },
  updateItem: {
    marginRight: 15,
  },
  peopleContainer: {},
  circlesContainer: {},
  messagesContainer: {},
  peopleListContainer: {
    paddingVertical: 5,
  },
});

export default SearchScreen;