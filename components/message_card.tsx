import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
import { IconSymbol } from './ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme.web'
import { formatDistance } from 'date-fns';
import { useRouter } from 'expo-router';

type MessageCardProps = {
    id: string
    image: string | null;
    title: string;
    message: string;
    date: Date;
    isCircle: boolean;
  };

  
const MessageCard = ({ id, image, title, message, date, isCircle }: MessageCardProps) => {
    const scheme = useColorScheme()
    const router = useRouter();
    const formattedDate = formatDistance(date, new Date(), { addSuffix: true });
    
    const handlePress = () => {
        router.push({
            pathname: `/chat/[chatId]`,
            params: { 
                chatId: id,
                title: title, 
                image: image || ''
            }
        });
    }

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      {!image  ? 
        <View style={styles.iconCircle}>
          <IconSymbol 
            name={isCircle ? "person.3.fill" : "person.fill"} 
            size={isCircle ? 50 : 35} 
            color={"#fff"}
          />
        </View>
        : 
        <Image style={styles.image} source={{ uri: image }} />
      }
      <View style={styles.info_Container}>
        <View style={styles.title_date}>
            <Text style={[styles.title, {color: Colors[scheme ?? 'light'].text}]}>{title}</Text>
            <Text style={[styles.date, {color: Colors[scheme ?? 'light'].text}]}>{formattedDate}</Text>
        </View>
        <Text numberOfLines={2} style={[{ color: Colors[scheme ?? 'light'].text}]}>{message}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    paddingHorizontal: 5,
    marginVertical: 5
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#cccccc",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info_Container: {
    flexDirection: "column",
    height: "100%",
    justifyContent: "flex-start",
    padding: 10,
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: "#999797"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  title_date: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  }, 
  date: {
    fontSize: 15
  }
})

export default MessageCard