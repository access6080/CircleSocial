import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { useColorScheme } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface StoryCircleProps {
  imageUri: string
  size?: number
  name?: string
  seen?: boolean
  onPress?: () => void
  borderWidth?: number
}

const StoryCircle = ({
  imageUri,
  size = 70,
  name,
  seen = false,
  onPress,
  borderWidth = 3
}: StoryCircleProps) => {
  const colorScheme = useColorScheme() || 'light'
  const tintColor = Colors[colorScheme].tint
  const innerPadding = 2 // Space between the border and image
  
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {!seen ? (
        // Unseen story with gradient border
        <View>
          <LinearGradient
            colors={[tintColor, '#4287f5', '#a2c2f5', tintColor]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: size + borderWidth * 2,
              height: size + borderWidth * 2,
              borderRadius: (size + borderWidth * 2) / 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={{
              backgroundColor: Colors[colorScheme].background,
              borderRadius: size / 2,
              width: size,
              height: size,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image
                source={{ uri: imageUri }}
                style={{
                  width: size - innerPadding * 2,
                  height: size - innerPadding * 2,
                  borderRadius: (size - innerPadding * 2) / 2,
                }}
              />
            </View>
          </LinearGradient>
        </View>
      ) : (
        // Seen story with grey border
        <View style={{
          borderColor: '#CCCCCC',
          borderWidth: borderWidth,
          borderRadius: (size + borderWidth * 2) / 2,
          width: size + borderWidth * 2,
          height: size + borderWidth * 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View style={{
            backgroundColor: Colors[colorScheme].background,
            borderRadius: size / 2,
            width: size,
            height: size,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Image
              source={{ uri: imageUri }}
              style={{
                width: size - innerPadding * 2,
                height: size - innerPadding * 2,
                borderRadius: (size - innerPadding * 2) / 2,
              }}
            />
          </View>
        </View>
      )}
      {name && (
        <Text style={[styles.name, { color: Colors[colorScheme].text }]} numberOfLines={1}>
          {name}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 6,
  },
  name: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    maxWidth: 70,
  }
});

export default StoryCircle;