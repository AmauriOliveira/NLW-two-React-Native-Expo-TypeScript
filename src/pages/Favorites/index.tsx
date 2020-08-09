import React from 'react';
import { View, Text } from 'react-native';
import PageHeader from '../../components/PageHeader';

import styles from './styles';

function Favorites() {
    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys Favoritos" />
            <Text>
                Favorites
            </Text>
        </View>
    );
}

export default Favorites;