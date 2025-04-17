import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { IconSymbol } from './ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useRouter } from 'expo-router'
import CreateMessageModal from './CreateMessageModal'

const Header = () => {
    const colorScheme = useColorScheme()
    const router = useRouter()
    const [createMessageModalVisible, setCreateMessageModalVisible] = useState(false)
  return (
    <View style={styles.container}>
        {/* <Image source={require("@/assets/images/header_icon.png")} style={styles.image}/> */}
            <Pressable
                style={[
                    { flex: 1, marginRight: 20, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, justifyContent: 'flex-start' },
                    { backgroundColor: Colors[colorScheme ?? "light"].card, flexDirection: "row"}
                ]}
                onPress={() => router.push('/search')}
            >
                <IconSymbol name='magnifyingglass' color={Colors[colorScheme ?? "light"].text} size={20}/>
                <Text style={{ color: Colors[colorScheme ?? "light"].text, fontSize: 16, marginHorizontal: 5 }}>
                    Search...
                </Text>
            </Pressable>
        <View style={styles.buttonContainer}>
            {/* Create Message/Circle Button */}
            <Pressable onPress={() => setCreateMessageModalVisible(true)}>
                <IconSymbol name='square.and.pencil' color={Colors[colorScheme ?? "light"].text} size={35}/>
            </Pressable>
        </View>
        
        {/* Create Message Modal */}
        <CreateMessageModal 
            visible={createMessageModalVisible} 
            onClose={() => setCreateMessageModalVisible(false)} 
        />
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 50,
        resizeMode: "contain"
    },
    container: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    }, 
    buttonContainer: {
        flex: 0.2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        height: '100%'
    }, 
    icon_text: {
        fontSize: 30,
        fontFamily: "Monoton",
    }
})

export default Header