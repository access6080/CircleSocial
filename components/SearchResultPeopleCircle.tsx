import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from './ui/IconSymbol';

type SearchResultPeopleCircleProps = {
  id: string;
  name: string;
  image?: string | null;
  isCircle?: boolean;
  onPress: () => void;
};

const SearchResultPeopleCircle = ({
  id,
  name,
  image,
  isCircle = false,
  onPress
}: SearchResultPeopleCircleProps) => {
  const colorScheme = useColorScheme();

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={[styles.iconContainer, { backgroundColor: '#CCC' }]}>
            <IconSymbol 
              name={isCircle ? "person.3.fill" : "person.fill"} 
              size={isCircle ? 50 : 24} 
              color="#FFFFFF" 
            />
          </View>
        )}
      </View>
      
      <Text style={[styles.name, { color: Colors[colorScheme ?? 'light'].text }]}>
        {name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  iconContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  circleIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4e98d7',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
});

export default SearchResultPeopleCircle;