import { SafeAreaView, StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import React from 'react'

export default function Screen({ children, style }) {
    return (
        <SafeAreaView style={[styles.screen, style]}>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1
    }
})