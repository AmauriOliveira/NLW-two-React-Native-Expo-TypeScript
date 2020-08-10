import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { View, Text, ImageBackground } from 'react-native';
import styles from './styles';
import giveClassesBgImg from '../../assets/images/give-classes-background.png';

function GiveClasses() {
    const { goBack } = useNavigation();

    function handleNavigationBack() {
        goBack();
    }
    return (
        <View style={styles.container}>
            <ImageBackground
                resizeMode="contain"
                source={giveClassesBgImg}
                style={styles.content}
            >
                <Text style={styles.title}>
                    Quer ser um Proffy?
                </Text>
                <Text style={styles.description}>
                    Para começar, você precisa de cadastrar como professor na nossa plataforma web.
                </Text>
            </ImageBackground>
            <RectButton
                style={styles.okButton}
                onPress={handleNavigationBack}
            >
                <Text style={styles.okButtonText}>
                    Tudo Bem?
                </Text>
            </RectButton>
        </View>
    );
}


export default GiveClasses;