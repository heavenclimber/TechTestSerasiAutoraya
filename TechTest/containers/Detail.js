import React, {useEffect, useState} from 'react';
import {NativeBaseProvider, Box, Flex} from 'native-base';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';

import {useSelector, useDispatch} from 'react-redux';
import {setId, setFname, setLname, setAge, setPhoto} from '../Redux/actions';

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

export const Detail = ({navigation}) => {
  const {id} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const api = '3abef4f586511b7bb1a9ed4788796564';
  const link =
    'https://api.themoviedb.org/3/movie/' +
    id +
    '?api_key=3abef4f586511b7bb1a9ed4788796564&language=en-US';

  const [detailData, setDetailData] = useState({});

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
        setDetailData(res);
      })
      .catch(error => {
        alert(error);
      });
  });

  const scoreColor = (e)=>{
      let color;
      if(e>=8.5 ){
        color = '#32CD32'
      }
     else if(e>=7.5 && e<8.5){
        color = '#00FF00'
      }
      else if(e>=5.0 && e<7.5){
        color = '#FFAA1D'
      }
      else if(e<5.0){
        color = '#FF4500'
      }

      return color;
  }

  let posterlink =
    'https://image.tmdb.org/t/p/original' + detailData.poster_path;
  return (
    <View style={styles.body}>
      {detailData ? (
        <View>
          <ScrollView>
            <Text style={styles.movie_title}>{detailData.title}</Text>
            <View>
              <Text style={styles.movie_tagline}>"{detailData.tagline}"</Text>
            </View>
            <View>
              <Image
                style={styles.movie_poster}
                source={{uri: posterlink}}></Image>
            </View>
            <View>
                <View style={{marginBottom:15, display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                    <View style={{backgroundColor: scoreColor(detailData.vote_average), width:50, borderRadius:5, display:'flex', alignItems:'center', justifyContent:'center', padding:10}}>
                       <Text style={{fontWeight:'900', color:'#fff', textAlign:'center', fontSize:16}}> {detailData.vote_average}</Text>
                    </View>
                    <View>
                        <Text style={{color:"#fff", fontStyle:'italic', textAlign:'right'}}>Duration: {detailData.runtime} minutes</Text>
                        <Text style={{color:"#fff", fontStyle:'italic', textAlign:'right'}}>Release: {detailData.release_date}</Text>
                    </View>
                </View>
              {detailData.genres ? (
                <View style={styles.movie_genre_container}>
                  {detailData.genres.map((val, i) => {
                    return (
                      <View key={i} style={styles.movie_genre_box}>
                        <Text style={styles.movie_genre_text}>{val.name}</Text>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <View></View>
              )}
              <View style={{marginTop:10, marginBottom:10}}>
                  <Text style={{color:"#fff", fontStyle:'italic', textAlign:'left',color:'gainsboro'}}>
                      "{detailData.overview}"
                  </Text>
              </View>
              <View>
                  <Text style={{color:"#fff"}}>Language(s):</Text>
                  {detailData.spoken_languages ? (
                <View style={styles.movie_language_container}>
                  {detailData.spoken_languages.map((val, i) => {
                    return (
                      <View key={i} style={styles.movie_language_box}>
                        <Text style={styles.movie_language_text}>{val.name}</Text>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <View></View>
              )}
              </View>
              <View>
                  {detailData.production_companies ? (
                <View style={styles.production_container}>
                  {detailData.production_companies.map((val, i) => {
                      let productionLink="https://image.tmdb.org/t/p/original"+val.logo_path;
                    if(val.logo_path!=undefined && val.logo_path!=null){
                        return (
                            <View key={i}>
                              <Image style={styles.production_logo} source={{uri:productionLink}} />
                            </View>
                          );
                    }
                  })}
                </View>
              ) : (
                <View></View>
              )}
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#000',
    // minHeight: ScreenHeight,
    // minWidth: ScreenWidth,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
  },
  movie_title_container: {
    display: 'flex',
    justifyContent: 'center',
    padding: 5,
  },
  movie_title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
  },
  movie_tagline: {
    fontWeight: '400',
    textAlign: 'center',
    color: 'gainsboro',
    fontStyle: 'italic',
  },
  movie_poster: {
    width: null ,
    height: ScreenWidth * 1.3,
    flex:1,
    resizeMode: 'contain',
    marginTop:10,
    marginBottom:10,
  },
  movie_score_box:{
      backgroundColor:''
  },
  movie_genre_container:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap'
  },
  movie_genre_box:{
      backgroundColor:'red',
      marginRight:6,
      padding:5,
      paddingLeft:7,
      paddingRight:7,
      borderRadius:5,
  },
  movie_genre_text: {
    color: '#fff',
    textAlign:'center'
  },
  movie_language_container:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap'
  },
  movie_language_box:{
      marginRight:5,
      padding:5,
      paddingLeft:3,
      paddingRight:3,
  },
  movie_language_text: {
    color: 'red',
    textAlign:'center'
  },
  production_container:{
      display:'flex',
      flexDirection:'row',
    justifyContent:'flex-end',
    flexWrap:'wrap',
      marginTop:10
  },
  production_logo:{
      height:30,
      width:80,
      flex:1,
      resizeMode:'contain',
      backgroundColor:'white',
      marginRight:10,
      marginBottom:10,
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
