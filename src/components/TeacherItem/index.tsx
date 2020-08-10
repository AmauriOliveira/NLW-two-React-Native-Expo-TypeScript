import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

export interface teacherInterface {
    id: number;
    subject: string;
    cost: number;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
}
interface TeacherItemProps {
    teacher: teacherInterface;
    favorited: boolean;
};

const TeacherItem: React.FunctionComponent<TeacherItemProps> = ({ teacher, favorited }) => {
    const { id, subject, cost, name, avatar, whatsapp, bio, } = teacher;
    const [isFavorite, setIsFavorite] = useState(favorited);

    function handleLinkToWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${whatsapp}`);
        //whatsapp://send?text=Hello World!&phone=+9198********1"
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');

        let favoritesArray = [];

        if (favorites) {
            favoritesArray = JSON.parse(favorites);
        }

        if (isFavorite) {
            const favoriteIndex = favoritesArray.findIndex((teacherItem: teacherInterface) => {
                return teacherItem.id === teacher.id;
            });
            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorite(false);
        } else {

            favoritesArray.push(teacher);
            setIsFavorite(true);
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    source={{ uri: avatar }}
                    style={styles.avatar}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>
                        {name}
                    </Text>
                    <Text style={styles.subject}>{subject}</Text>
                </View>
            </View>
            <Text style={styles.bio}>{bio}</Text>
            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'   '}
                    <Text style={styles.value}>
                        R$ {cost}
                    </Text>
                </Text>
                <View style={styles.buttonsContainer}>

                    <RectButton
                        onPress={handleToggleFavorite}
                        style={[
                            styles.favoriteButton,
                            isFavorite
                                ? styles.favorited
                                : {}
                        ]}>
                        {isFavorite
                            ? <Image source={unFavoriteIcon} />
                            : <Image source={heartOutlineIcon} />
                        }

                    </RectButton>

                    <RectButton
                        onPress={handleLinkToWhatsapp}
                        style={styles.contactButton}
                    >
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>
                            Entrar em contato
                        </Text>
                    </RectButton>

                </View>
            </View>
        </View >
    );

}

export default TeacherItem;