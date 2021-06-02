/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {Button, Dimensions, Image, Text, View} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {FloatingAction} from 'react-native-floating-action';
import actions from './actions';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import styles from './styles';
import GetLocation from 'react-native-get-location';

const HomeMap = ({navigation}) => {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [curlatt, setCurlatt] = useState(20.981553);
  const [curlng, setCurlng] = useState(105.787899);
  useEffect(() => {
    setRefresh(false);
    getLocation();
  }, [refresh]);

  const curLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        setCurlatt(location.latitude);
        setCurlng(location.longitude);
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(true);
      });
  };
  const getLocation = () => {
    axios
      .get('https://location-suggestion.herokuapp.com/locations')
      .then(response => {
        // handle success
        setData(response.data);
        curLocation();
      })
      .catch(err => {
        console.log(err);
      });
  };
  if (!data) {
    return null;
  }

  return (
    <View>
      {loaded ? (
        <View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{height: '100%', width: '100%'}}
            initialRegion={{
              latitude: curlatt,
              longitude: curlng,
              latitudeDelta: 0.02,
              longitudeDelta: 0.01,
            }}>
            <Marker coordinate={{latitude: curlatt, longitude: curlng}}>
              <Image
                source={require('../../assets/youhere.png')}
                style={{width: 50, height: 50}}
              />
              <Text>U are here</Text>
            </Marker>
            {data.map(item => (
              <Marker
                key={item._id}
                coordinate={{
                  latitude: item.lat,
                  longitude: item.lng,
                }}
                pinColor="green"
                lable={item.name}>
                <Image
                  source={require('../../assets/foodsition.png')}
                  style={{width: 30, height: 50}}
                />
                <Text>{item.name}</Text>
                <Callout>
                  <View style={styles.callout}>
                    <Text style={{fontSize: 25, padding: 5}}>{item.name}</Text>
                    <Text>{item.address}</Text>
                    <Text>Món ngon: {item.desc}</Text>
                    <Text>Giá: {item.price}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
          <FloatingAction
            actions={actions}
            onPressItem={name => {
              navigation.navigate({name});
            }}
          />
          <View
            style={{
              position: 'absolute', //use absolute position to show button on top of the map
              bottom: '5%', //for center align
              left: '5%',
              alignSelf: 'flex-start', //for align to right
            }}>
            <Button
              title={'Refresh'}
              onPress={() => {
                setLoaded(false);
                setRefresh(true);
              }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.loadingStyle}>
          <LottieView
            source={require('../../assets/13901-food.json')}
            autoPlay={true}
            loop
            style={{
              width: Dimensions.get('screen').width / 2,
              height: Dimensions.get('screen').width / 2,
            }}
          />
          <Text>Loading, Please Wait ...</Text>
        </View>
      )}
    </View>
  );
};

export default HomeMap;
