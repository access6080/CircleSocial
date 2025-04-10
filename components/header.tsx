import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { IconSymbol } from './ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

const Header = () => {
    const colorScheme = useColorScheme()
  return (
    <View style={styles.container}>
        {/* <Image source={require("@/assets/images/header_icon.png")} style={styles.image}/> */}
            <Pressable
                style={[
                    { flex: 1, marginHorizontal: 10, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, justifyContent: 'flex-start' },
                    { backgroundColor: Colors[colorScheme ?? "light"].card, flexDirection: "row"}
                ]}
                // onPress={() => navigation.navigate("Search")}
            >
                <IconSymbol name='magnifyingglass' color={Colors[colorScheme ?? "light"].text} size={20}/>
                <Text style={{ color: Colors[colorScheme ?? "light"].text, fontSize: 16, marginHorizontal: 5 }}>
                    Search...
                </Text>
            </Pressable>
        <View style={styles.buttonContainer}>
            <Pressable>
                <IconSymbol  name='square.and.pencil' color={Colors[colorScheme ?? "light"].text} size={30}/>
            </Pressable>
            <Pressable>
                <IconSymbol  name='camera.fill' color={Colors[colorScheme ?? "light"].text} size={35}/>
            </Pressable>
        </View>
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
        justifyContent: "space-between",
        padding: 10,
        flexDirection: "row",
        alignItems: "center"
    }, 
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center',
        width: 100
    }, 
    icon_text: {
        fontSize: 30,
        fontFamily: "Monoton",
    }
})

export default Header