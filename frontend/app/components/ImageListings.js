import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ImagesDisplay from './ImagesDisplay';
import Screen from './Screen';
import { ScrollView } from 'react-native';

export default function ImageListings({ images, onPress }) {

    return (

        <FlatList
            data={images}
            scrollEnabled={true}
            keyExtractor={item => item.uri.toString()}
            numColumns={3} // Display three columns
            renderItem={({ item }) => (
                <ImagesDisplay
                    imageUri={{ uri: item.uri }}
                    onPress={onPress}
                />
            )}
            contentContainerStyle={styles.container}
        />


    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        // paddingHorizontal: 10,
        // paddingTop: 10
    }
});
