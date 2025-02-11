import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcon from './MaterialIcon';
// import {MaterialIcon} from '@expo/vector-icons'
import colors from '../config/colors';
import defaultStyles from '../config/styles'

export default function SearchButton({ handleSearch }) {
    const [searchVisible, setSearchVisible] = useState(false);

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };
    return (

        <>
            {!searchVisible && (

                <TouchableOpacity onPress={toggleSearch}>
                    <MaterialIcon name={"search"} size={25} color={colors.primary} style={styles.searchIcon} />
                </TouchableOpacity>
            )
            }
            {
                searchVisible && (
                    <View style={[styles.container]}>
                        <TouchableOpacity onPress={toggleSearch}>
                            <MaterialIcon name={'close'} size={25} color={colors.medium} style={styles.icon} />
                        </TouchableOpacity>
                        <TextInput
                            placeholderTextColor={colors.medium}
                            style={defaultStyles.text}
                            placeholder='Search Image'
                            onChangeText={(text) => {
                                handleSearch(text)
                            }}
                        />
                    </View>
                )
            }
        </>

    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 15,
        marginVertical: 10
    },
    icon: {
        marginRight: 10,
    },
    searchIcon: {
        alignSelf: 'flex-end',
        marginVertical: 10,
        marginRight: 10
    }
})

