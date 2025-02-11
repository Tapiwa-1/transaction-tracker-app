import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import React from 'react'
import MaterialIcon from './MaterialIcon'
import AppText from './AppText'

export default function ListItem({
    title,
    subTitle,
    onPress,
}) {
    return (
        <TouchableHighlight underlayColor={colors.dark} onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.detailsContainer}>
                    <AppText style={styles.title} numberOfLines={1}>
                        {title}
                    </AppText>
                    {subTitle && (
                        <AppText style={styles.subTitle} numberOfLines={2}>
                            {subTitle}
                        </AppText>
                    )}
                </View>
                <MaterialIcon
                    color={colors.medium}
                    name="chevron-right"
                    size={25}
                />
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        padding: 15,
        backgroundColor: colors.white,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center",
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    subTitle: {
        color: colors.medium,
    },
    title: {
        fontWeight: "500",
    },
});