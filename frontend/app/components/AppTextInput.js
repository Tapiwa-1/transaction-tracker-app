import { Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import MaterialIcon from './MaterialIcon'
import colors from '../config/colors'
import defaultStyles from '../config/styles'

const AppTextInput = ({ icon, width = '100%', ...otherProps }) => {
    return (
        <View style={[styles.container, { width }]}>
            {icon && <MaterialIcon name={icon} size={20} color={colors.medium} style={styles.icon} />}
            <TextInput
                placeholderTextColor={colors.medium}
                style={defaultStyles.text} {...otherProps} />
        </View>
    )
}

export default AppTextInput

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
        borderRadius: 10,
        flexDirection: 'row',
        padding: 15,
        marginVertical: 10
    },
    icon: {
        marginRight: 10,
    }
})