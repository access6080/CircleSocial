import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import StoryCircle from './update_circle'

const UpdateSection = () => {
    const updates = [false, false, false, false, false, false, true, true]
  return (
    <View style={styles.container}>
        <ScrollView horizontal contentContainerStyle={styles.scrollview} showsHorizontalScrollIndicator={false}>
        {updates.map((update, i) => (
              <StoryCircle
                key={i}
                imageUri={`https://randomuser.me/api/portraits/men/${i}.jpg`}
                name="John Doe"
                seen={update}
                onPress={() => console.log("Story pressed")}
          />
        ))}
        </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    scrollview: {
  
    }
})

export default UpdateSection