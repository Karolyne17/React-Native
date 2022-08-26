import React, { useCallback, useState } from 'react';
import {
ImageBackground,
SafeAreaView,
ScrollView,
StatusBar,
StyleSheet,
Text,
useColorScheme,
View,
TouchableOpacity,
Button,
Modal,
Linking,
} from 'react-native';
import Colors from '../Components/Colors';
import DocumentPicker from 'react-native-document-picker';
import { Camera } from 'react-native-vision-camera';
import notifee from '@notifee/react-native';

const Accueil = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  /* DOCUMENT PICKER */
  const [fileResponse, setFileResponse] = useState([]);
  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);
  /* DOCUMENT PICKER */

/* CAMERA */
  const [modalVisible, setModalVisible] = useState(false);

  async function onPressButtonAutorisation() {
    await Linking.openSettings();
    setModalVisible(false);
  }

  const onPressCamera = async () => {

  const cameraPermission = await Camera.getCameraPermissionStatus();
  //const microphonePermission = await Camera.getMicrophonePermissionStatus();
  const newCameraPermission = await Camera.requestCameraPermission();
  //const newMicrophonePermission = await Camera.requestMicrophonePermission();

    if(cameraPermission === 'authorized'){
    navigation.navigate('Cam');
    }
    else {
      const newCameraPermission = await Camera.requestCameraPermission();
      if (newCameraPermission == 'denied') {
        setModalVisible(true);
      }
    }
  };

  /* CAMERA */

  /* NOTIFICATION */

  async function onPressNotification() {

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Bonjour',
      body: 'Ceci est une notification',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  }

    /* NOTIFICATION */
    

    return (
  <View>
    <View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white,}}>
      <ImageBackground
      accessibilityRole="image"
      testID="new-app-screen-accueil"
      source={require('../images/screen-2.webp')}
      style={[
          styles.background,
          {
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          },
      ]}
      imageStyle={styles.logo}>
        <Text
            style={[
            styles.text,
            {
                color: isDarkMode ? Colors.white : Colors.black,
            },
            ]}>
            Vous êtes sur
            {'\n'}
            L'accueil
        </Text>
      </ImageBackground>
    </View>
    <View>
      <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Passager')}>
        <Text style={styles.btnText}>Voir la liste des films</Text>
      </TouchableOpacity>


      {fileResponse.map((file, index) => (
        <Text
          key={index.toString()}
          style={styles.uri}
          numberOfLines={1}
          ellipsizeMode={'middle'}>
          {file?.uri}
        </Text>
      ))}
            <TouchableOpacity
      style={styles.button}
      onPress={handleDocumentSelection}>
        <Text style={styles.btnText}>Selectionner une image</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={false} animation="slide">
        <Text>
          Pour utiliser cette fonctionalité vous devez accepter les
          autorisations
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={onPressButtonAutorisation}
        >
          <Text style={styles.buttonText}>Changer les autorisations</Text>
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity
      style={styles.button}
      onPress={onPressCamera}
        >
        <Text style={styles.btnText}>Prendre une photo</Text>
      </TouchableOpacity>

      <TouchableOpacity
      title="Display Notification"
      style={styles.button}
      onPress={onPressNotification}
        >
        <Text style={styles.btnText}>Déclencher une notification</Text>
      </TouchableOpacity> 

    </View>
  </View>
);
};

const styles = StyleSheet.create({
    background: {
      paddingBottom: 40,
      paddingTop: 96,
      paddingHorizontal: 32,
    },
    logo: {
      opacity: 0.2,
      overflow: 'visible',
      resizeMode: 'cover',
      /*
       * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
       *
       * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
       * source image's size.
       */
      marginLeft: -128,
      marginBottom: -192,
    },
    text: {
      fontSize: 40,
      fontWeight: '700',
      textAlign: 'center',
    },
    btnText:{
      height:100,
      backgroundColor: '#3d3d3d',
      textAlign:'center',
      fontSize:25,
      padding:30,
      color: '#c4fffe',
    },
  });

export default Accueil;