import React from "react";
import { View, Text , StyleSheet } from 'react-native'

const Logo = () => {
    return (
        <View style={styles.logo}>
            <Text style={styles.textLogo}>Catatan</Text>
        </View>
    )
}

export default Logo;

const styles = StyleSheet.create({
    logo:{
        width: 70,
        height: 70,
        backgroundColor: '#2596be',
        borderRadius: 100,
        alignSelf: 'center',
        bottom: 10
    },
    textLogo: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        top: 23,
        fontSize: 16
    }
})
