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
        <Text style={[styles.icon_text, { color: Colors[colorScheme ?? 'light'].text}]}>circle</Text>
      
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