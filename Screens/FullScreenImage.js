import React, { useState } from 'react';
import { Button } from 'react-native';
import {
    StyleSheet,
    View,
    Image,
    ScrollView
} from 'react-native';

const FullScreenImage = ({ navigation, route }) => {
    const image = route.params.imageUri;
    const [isRotate, setIsRotate] = useState(false);
    return (
       
            <View style={styles.mainContainer}>
                <Button title='Resmi 90 derece döndür.'
                    onPress={() => setIsRotate(!isRotate)} />
                {
                    isRotate === false ?
                        (<Image style={styles.image} source={{ uri: image }} />) :
                        (<Image style={styles.imageRotate} source={{ uri: image }} />)
                }

            </View>
      

    );
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        height:'100%'
    },
    image: {
        resizeMode: 'contain',
        width: '90%',
        height: '90%',

    },
    imageRotate: {
        resizeMode: 'contain',
        width: '90%',
        height: '90%',
        transform: [{ rotate: '90deg' }]
    }
});
export default FullScreenImage;