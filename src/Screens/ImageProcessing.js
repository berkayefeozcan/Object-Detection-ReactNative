import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Platform,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView, ImageBackground
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

const ImageProcessing = ({ navigation }) => {
    const [pickedImage, setPickedImage] = useState('https://www.stateofdigitalpublishing.com/wp-content/uploads/2019/06/Yolo-App-1200x900.png');
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [imageData, setImageData] = useState(false);
    const [headerText, setHeaderText] = useState('Bir resim çekmeli veya galeriden seçmelisiniz');

    const handleUploadPhoto = () => {
        const image = pickedImage; // upload hatasi alirsak ayni resmin render edilmesi icin
        setPickedImage(null);
        setHeaderText('Resim server a gönderiliyor ....')
        RNFetchBlob.fetch('POST', 'http://ec2-3-17-193-8.us-east-2.compute.amazonaws.com:5000/image', {
            // Authorization : "Bearer access-token",
            // otherHeader : "foo",
            'Content-Type': 'application/image',
        }, [
            // element with property `filename` will be transformed into `file` in form data

            { name: 'images', filename: 'image.jpg', type: 'image/jpg', data: imageData },
        ]).then((resp) => {
            Alert.alert("Yükleme işlemi başarılı!", "Resim basariyla server a yuklendi", [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK" }

            ]);
            const base64Data = resp.base64();
            setPickedImage(`data:image/jpg;base64,${base64Data}`);
            setHeaderText('Resim işlendi');
            setIsImageSelected(false);
        }).catch((err) => {
            console.log("upload error", err);
            alert("Upload failed!");
            setPickedImage(image);
            setHeaderText('Yükleme başarısız oldu. İnternet bağlantısını kontrol ediniz.');
        })

    };

    const takeAPhoto = () => {
        launchCamera(
            {
                mediaType: 'photo',
                includeBase64: true,
                maxWidth: 1280,
                maxHeight: 720
            },
            (response) => {
                if (response.didCancel !== true) {
                    console.log(response.uri);
                    setImageData(response.base64)
                    setPickedImage(response.uri);
                    setHeaderText('Resim seçildi. Obje tanımlaması için kırmızı butona basınız');
                    setIsImageSelected(true);
                }

            },
        )
    }
    const pickImageFromGallery = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: true,
                maxWidth: 1280,
                maxHeight: 720

            },
            (response) => {
                if (response.didCancel !== true) {
                    console.log(response);
                    setImageData(response.base64)
                    setPickedImage(response.uri);
                    setHeaderText('Resim seçildi. Obje tanımlaması için kırmızı butona basınız');
                    setIsImageSelected(true);
                }
            },
        )

    }
    const fullScreenNavigationHandler = () => {
        if (pickedImage !== null) {
            navigation.navigate('FullScreen', {
                imageUri: pickedImage,
            });
        }
    }

    return (
        <ScrollView style={{ backgroundColor: '#fff' }} >
            <View style={styles.container}>
                <View style={styles.main}>

                    <Text style={styles.headerTextContainer}>
                        <Text>Durum : </Text>{headerText}
                    </Text>
                    <View style={styles.imagePreview}>
                        {pickedImage == null ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                                <TouchableOpacity style={styles.image} onPress={fullScreenNavigationHandler}>
                                    {pickedImage == null ? (
                                        <ActivityIndicator size="large" color="#0000ff" />
                                    ) : (
                                            <ImageBackground style={styles.image} source={{ uri: pickedImage }} >
                                            </ImageBackground>
                                        )}
                                </TouchableOpacity>

                            )}
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Fotoğraf Çek"
                            onPress={takeAPhoto}
                        />
                        <Button
                            title="Galeriden Resim Seç"
                            color={'green'}
                            onPress={pickImageFromGallery}
                        />
                        <Button
                            title="Resmi servera gonder"
                            color={'red'}
                            onPress={handleUploadPhoto}
                            disabled={!isImageSelected}
                        />
                    </View>

                </View>
            </View>


        </ScrollView>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    main: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
    }, imagePreview: {
        width: '95%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1,
        aspectRatio: 1.5,
        resizeMode: 'contain',

    },
    buttonContainer: {
        flexDirection: "column",
        justifyContent: 'space-between',
        height: 150
    },
    headerTextContainer: {
        fontSize: 15,
        marginBottom: 20,
        textAlign: 'center'
    }

});
export default ImageProcessing;