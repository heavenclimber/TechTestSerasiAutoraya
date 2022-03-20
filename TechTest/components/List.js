import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import axios from 'axios';
import {connect, useSelector, useDispatch} from 'react-redux';

import {setId} from '../Redux/actions';

export const List=({navigation}) => {
  const {id} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const api = '3abef4f586511b7bb1a9ed4788796564';
  const link =
    'https://api.themoviedb.org/3/movie/now_playing?api_key=' +
    api +
    '&language=en-US&page=1';

  const [data, setData] = useState({});

  useEffect(() => {
    axios({
      url: link,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({}),
    })
      .then(response => {
        let res = response.data;
        setData(res);
      })
      .catch(error => {
        alert(error);
      });
  });

  const GoDetail = i => {
    dispatch(setId(data.results[i].id));
    navigation.navigate('Movie Detail');
  };

  return (
    <View style={styles.body}>
      {data.results ? (
        <ScrollView>
          {data.results.map((val, i) => {
            let posterlink =
              'https://image.tmdb.org/t/p/original' + val.poster_path;
            return (
              <TouchableOpacity key={i}
                onPress={() => GoDetail(i)}
                style={styles.movie_box}>
                <View style={styles.movie_title_container}>
                  <Text style={styles.movie_title}>{val.title}</Text>
                </View>
                <View>
                  <Image
                    style={styles.movie_poster}
                    source={{uri: posterlink}}></Image>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <Text>NO DATA</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    body:{
        backgroundColor:'#000'
    },
  movie_box: {
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'red',
    marginTop:5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
  },
  movie_title_container: {
    display: 'flex',
    justifyContent: 'center',
    padding: 5,
  },
  movie_title: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
  },
  movie_poster: {
    width: window.width,
    height: 500,
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps) (List);
