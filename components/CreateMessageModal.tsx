import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  Pressable, 
  TouchableOpacity, 
  FlatList, 
  Image,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from './ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Mock data for contacts
const CONTACTS = [
  { id: '1', name: 'John Doe', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Jane Smith', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '3', name: 'Mike Johnson', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: '4', name: 'Sarah Williams', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '5', name: 'David Brown', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: '6', name: 'Emily Davis', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: '7', name: 'Robert Wilson', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { id: '8', name: 'Jennifer Taylor', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
];

type CreateMessageModalProps = {
  visible: boolean;
  onClose: () => void;
};

const CreateMessageModal = ({ visible, onClose }: CreateMessageModalProps) => {
  const [mode, setMode] = useState<'initial' | 'circle' | 'direct'>('initial'); 
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const handleContactPress = (contactId: string) => {
    if (mode === 'circle') {
      // For circle creation, toggle selection
      setSelectedContacts(prev => 
        prev.includes(contactId) 
          ? prev.filter(id => id !== contactId)
          : [...prev, contactId]
      );
    } else {
      // For direct message, navigate to chat
      onClose();
      router.push({
        pathname: `/chat/[chatId]`,
        params: { 
          chatId: contactId,
          title: CONTACTS.find(c => c.id === contactId)?.name || '',
          image: CONTACTS.find(c => c.id === contactId)?.image || ''
        }
      });
    }
  };

  const handleCreateCircle = () => {
    // In a real app, you would create the circle in your backend
    if (selectedContacts.length > 0) {
      const circleId = `circle-${Date.now()}`;
      onClose();
      router.push({
        pathname: `/chat/[chatId]`,
        params: { 
          chatId: circleId,
          title: `New Circle (${selectedContacts.length + 1})`,
          image: null
        }
      });
    }
  };

  const renderContactItem = ({ item }: { item: typeof CONTACTS[0] }) => {
    const isSelected = selectedContacts.includes(item.id);
    
    return (
      <TouchableOpacity 
        style={[
          styles.contactItem,
          isSelected && mode === 'circle' && { 
            backgroundColor: Colors[colorScheme ?? 'light'].card 
          }
        ]}
        onPress={() => handleContactPress(item.id)}
      >
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.contactImage} />
        ) : (
          <View style={styles.contactImagePlaceholder}>
            <Text style={styles.contactInitial}>
              {item.name.charAt(0)}
            </Text>
          </View>
        )}
        
        <Text style={[
          styles.contactName,
          { color: Colors[colorScheme ?? 'light'].text }
        ]}>
          {item.name}
        </Text>
        
        {mode === 'circle' && (
          <View style={[
            styles.checkbox, 
            isSelected && { 
              backgroundColor: Colors[colorScheme ?? 'light'].tint,
              borderColor: Colors[colorScheme ?? 'light'].tint,
            }
          ]}>
            {isSelected && (
              <IconSymbol 
                name="checkmark" 
                color="#FFF" 
                size={12} 
              />
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderInitialView = () => (
    <View style={styles.optionsContainer}>
      <TouchableOpacity 
        style={styles.optionButton}
        onPress={() => setMode('direct')}
      >
        <View style={[
          styles.optionIcon, 
          { backgroundColor: Colors[colorScheme ?? 'light'].tint }
        ]}>
          <IconSymbol 
            name="person.fill" 
            size={30} 
            color={isDark ? "#CCC" : "#FFF"} 
          />
        </View>
        <Text style={[
          styles.optionText, 
          { color: Colors[colorScheme ?? 'light'].text }
        ]}>
          New Message
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.optionButton}
        onPress={() => setMode('circle')}
      >
        <View style={[
          styles.optionIcon, 
          { backgroundColor: Colors[colorScheme ?? 'light'].tint }
        ]}>
          <IconSymbol 
            name="person.3.fill" 
            size={35} 
            color={isDark ? "#CCC" : "#FFF"} 
          />
        </View>
        <Text style={[
          styles.optionText, 
          { color: Colors[colorScheme ?? 'light'].text }
        ]}>
          New Circle
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => {
    let title = "New Message";
    if (mode === 'circle') title = "Create Circle";
    
    return (
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => {
            if (mode === 'initial') {
              onClose();
            } else {
              setMode('initial');
              setSelectedContacts([]);
            }
          }}
        >
          {mode === 'initial' ? (
            <IconSymbol 
              name="xmark" 
              size={24} 
              color={Colors[colorScheme ?? 'light'].text} 
            />
          ) : (
            <IconSymbol 
              name="chevron.left" 
              size={24} 
              color={Colors[colorScheme ?? 'light'].text} 
            />
          )}
        </TouchableOpacity>
        
        <Text style={[
          styles.headerTitle, 
          { color: Colors[colorScheme ?? 'light'].text }
        ]}>
          {title}
        </Text>
        
        {mode === 'circle' && (
          <TouchableOpacity 
            style={[
              styles.createButton, 
              selectedContacts.length === 0 && { opacity: 0.5 }
            ]}
            onPress={handleCreateCircle}
            disabled={selectedContacts.length === 0}
          >
            <Text style={[
              styles.createButtonText, 
              { color: Colors[colorScheme ?? 'light'].tint }
            ]}>
              Create
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderContactView = () => (
    <FlatList
      data={CONTACTS}
      keyExtractor={(item) => item.id}
      renderItem={renderContactItem}
      contentContainerStyle={styles.contactsList}
    />
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={[
        styles.modalContainer,
        { backgroundColor: colorScheme === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)' }
      ]}>
        <SafeAreaView style={styles.safeArea}>
          {renderHeader()}
          
          <View style={styles.content}>
            {mode === 'initial' 
              ? renderInitialView()
              : renderContactView()
            }
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(150,150,150,0.2)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  createButtonText: {
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  optionsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
  },
  optionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
  },
  contactsList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 6,  // Increased from 5 to 6
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  contactImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  contactName: {
    fontSize: 16,
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreateMessageModal;