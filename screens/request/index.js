/* eslint-disable prettier/prettier */
import React from 'react';
import {useState} from 'react';
import {Alert, Button, ImageBackground, TextInput, View} from 'react-native';
import styles from './styles';
import axios from 'axios';

const RequestForm = ({navigation}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');

  const senRequest = () => {
    axios
      .post('https://location-suggestion.herokuapp.com/locations/create', {
        name: name,
        address: address,
        desc: desc,
        price: price,
      })
      .then(response => {
        // handle success
      })
      .catch(err => {});

    Alert.alert('THANK YOU <3<3', 'cam on ban da chia se!!', [
      {
        text: 'oke',
        onPress: () => navigation.navigate('HomeMap'),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/back.jpg')}
        style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ten Quan"
            onChangeText={name => setName(name)}
            defaultValue={name}
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.input}
            placeholder="Dia Chi"
            onChangeText={address => setAddress(address)}
            defaultValue={address}
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.input}
            placeholder="Mon dac trung"
            onChangeText={desc => setDesc(desc)}
            defaultValue={desc}
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.input}
            placeholder="Khoang Gia"
            onChangeText={price => setPrice(price)}
            defaultValue={price}
            placeholderTextColor="black"
          />
        </View>
        <View style={styles.button}>
          <Button
            color="orange"
            title={'request'}
            onPress={() => senRequest()}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default RequestForm;
