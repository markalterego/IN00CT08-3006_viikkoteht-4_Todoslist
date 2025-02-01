import { Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';

export default function Row({item}) {
    const [strikethrough, setStrikethrough] = useState(false);

    return (
        <Text 
            style={[styles.text, strikethrough && styles.strikeThrough]} // if strikethrough is true, item displayed as such
            onPress={() => {
                if (!strikethrough) { setStrikethrough(true) } 
                else { setStrikethrough(false) }
            }}
        >{item.name}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        marginBottom: 10,
    },
    strikeThrough: { 
        textDecorationLine: 'line-through'
    }
});
