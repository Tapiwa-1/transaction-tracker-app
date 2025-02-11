import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

export default function MaterialIcon({ name, color, size, ...otherProps }) {
    return (
        <MaterialIcons name={name} color={color} size={size} {...otherProps}></MaterialIcons>
    )
}

const styles = StyleSheet.create({})