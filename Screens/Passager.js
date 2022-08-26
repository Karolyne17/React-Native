import React, { useEffect, useState } from 'react';
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
Image,
Div,
} from 'react-native';

import Colors from '../Components/Colors';

const Passager = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const [listFilm, setListFilm] = useState([]);
    useEffect(() => {
    fetch('https://ghibliapi.herokuapp.com/films')
    .then(json => json.json())
    .then(res => setListFilm(res));
  }, []);

    return (
      <>
    <ImageBackground
    accessibilityRole="image"
    testID="new-app-screen-passager"
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
        Liste des films
    </Text>
    </ImageBackground>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {listFilm.map(film => (
          <TouchableOpacity key={film.id} style={styles.item}>
            <View style={styles.listFilmContainer}>
              <View style={styles.listFilmSubContainer}>
                <Image style={styles.filmImage} source={{uri: film.image,}}/>
              </View>
              <View style={styles.listFilmInfos}>
                  <Text style={styles.listFilm}>{film.title}</Text>
                  <Text style={styles.listFilm}>{film.original_title}</Text>
                  <Text style={styles.listFilm}>Réalisateur : {film.director}</Text>
                  <Text style={styles.listFilm}>Année : {film.release_date}</Text>
                  <Text style={styles.listFilm}>Note : {film.rt_score}/100</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </>
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
    item: {
      height: 200,
      padding: 10,
      margin: 10,
      elevation: 10,
      shadowColor: '#52006A',
      backgroundColor: 'white',
    },
    listFilm: {
      color:'black',
    },
    filmImage: {
      width:120,
      height:180,
      resizeMode: 'cover',
    },
    listFilmContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    listFilmInfos: {
      marginLeft:30,
    },
  });

export default Passager;