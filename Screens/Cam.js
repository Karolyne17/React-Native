import React, { useRef, useState } from 'react';
import {
Image,
SafeAreaView,
ScrollView,
StatusBar,
StyleSheet,
Text,
useColorScheme,
View,
TouchableOpacity,
Button,
} from 'react-native';
import { Camera, useCameraDevices, PhotoFile } from 'react-native-vision-camera';


const Cam = ({route, navigation}) => {
  /*CAMERA */
const camera = useRef(null)
const devices = useCameraDevices();
const device = devices.back;
async function takePic() {
  const photo = await camera.current.takePhoto({
    flash: 'on',
  });
  setImageUri( 'file://' + photo.path );
  console.log(photo.path);
}
  /*CAMERA */

  const [imageUri, setImageUri] = useState('');
    if (imageUri) {
    return (
    <>
    <Image style={styles.previewImage} source={{uri : imageUri}}/>
    </>)
    }
  
      if ( device == null){
        return(
        <Text style={StyleSheet.textChargement}>chargement</Text>
        );
      }
      else{
        return(
          <>
            <Camera
            ref={camera}
            photo={true}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
          />
            <TouchableOpacity
            style={styles.button}
            onPress={takePic}>
            </TouchableOpacity>

        </>
          );
      };
  
};

const styles = StyleSheet.create({
  textChargement: {
    color:'#0a0a0a',
    fontSize:30,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 25,
  },
  previewImage: {
    width:'100%',
    height:'100%',
    resizeMode: 'cover',
  },
});

export default Cam;