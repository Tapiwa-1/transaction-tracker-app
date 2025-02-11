import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-media-library'
import MaterialIcon from './MaterialIcon'
import AppText from './AppText'
import colors from '../config/colors'

export default function AccountImage({ imageUri, onChangeImage, username, email, name = 'person' }) {
    return (<>
        <TouchableOpacity>
            <View style={styles.container}>
                {!imageUri && (
                    <MaterialIcon name={name} size={75} style={styles.icon} color={colors.white} />
                )}
                {imageUri && (
                    <Image style={styles.image} />
                )
                }
            </View>
        </TouchableOpacity>
        <AppText style={styles.text}>{username}</AppText>
        <AppText style={styles.emailText}>{email}</AppText>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,
        borderRadius: 50,
        backgroundColor: colors.primary,
        marginTop: 50,
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: '50%'
    },
    text: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 5
    },
    emailText: {
        alignSelf: 'center',
        fontWeight: '400',
        fontSize: 15,
        marginVertical: 5,
        color: colors.primary
    }

})