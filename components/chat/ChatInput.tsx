import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { IconSymbol } from '../ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ChatInputProps = {
  onSend: (message: string) => void;
};

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState<string>('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();
  
  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, 5) }
      ]}
    >
      <View style={[
        styles.inputContainer,
      ]}>
        {/* <View style={styles.attachButtonContainer}>
          <Pressable style={styles.attachButton}>
            <IconSymbol 
              name="camera.fill" 
              size={35} 
              color={Colors[colorScheme ?? 'light'].text} 
            />
          </Pressable>
        </View> */}
        
        <View style={[
          styles.textInputWrapper,
          {
            backgroundColor: isDark ? '#2C2C2E' : '#FFFFFF',
            borderWidth: 1,
            borderColor: isDark ? '#3A3A3C' : '#E5E5EA',
            borderRadius: 20,
          }
        ]}>
          <TextInput
            style={[
              styles.input,
              { color: isDark ? '#FFFFFF' : '#000000' }
            ]}
            placeholder="Message"
            placeholderTextColor={isDark ? '#8E8E93' : '#C7C7CC'}
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={1000}
          />

          <Pressable 
            style={styles.sendButton}
            onPress={handleSend}
            disabled={!message.trim()}
          >
            <IconSymbol 
              name="arrow.up.circle.fill" 
              size={30} 
              color={message.trim() ? Colors[colorScheme ?? 'light'].tint : '#8E8E93'} 
            />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
    justifyContent: 'space-between',
    alignItems: "center"
  },
  input: {
    fontSize: 16,
    maxHeight: 120,
    flex: 1,
  },
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    width: 36,
    marginLeft: 4,
  },
  attachButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  attachButton: {
    marginRight: 6,
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ChatInput;