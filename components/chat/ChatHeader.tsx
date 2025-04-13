import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '../ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ChatHeaderProps = {
  title: string;
  image: string | null;
};

const ChatHeader = ({ title, image }: ChatHeaderProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  
  return (
    <View 
      style={[
        styles.container, 
        { 
          paddingTop: insets.top,
          backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background
        }
      ]}
    >
      <View style={styles.contentContainer}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol 
            name="chevron.left" 
            size={28} 
            color={Colors[colorScheme ?? 'light'].tint} 
          />
          <Text style={[styles.backText, { color: Colors[colorScheme ?? 'light'].tint }]}>
            Messages
          </Text>
        </Pressable>
        
        <View style={styles.titleContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <View style={styles.iconCircle}>
              <IconSymbol 
                name="person.3.fill" 
                size={20} 
                color={"#fff"}
              />
            </View>
          )}
          
          <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>
      <View style={[
        styles.bottomBorder, 
        { borderBottomColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
      ]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  blurContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 44,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    width: 100,
  },
  backText: {
    fontSize: 17,
    marginLeft: -5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#cccccc",
    justifyContent: "center",
    alignItems: "center"
  },
  infoButton: {
    padding: 5,
    width: 40,
    alignItems: 'flex-end',
  },
  bottomBorder: {
    borderBottomWidth: 1,
    width: '100%',
  },
});

export default ChatHeader;