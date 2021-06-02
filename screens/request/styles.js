/* eslint-disable prettier/prettier */

import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    width: Dimensions.get('screen').width,
  },
  inputContainer: {
    justifyContent: 'space-between',
    height: 300,
    top: 100,
  },
  input: {
    height: 50,
    width: (Dimensions.get('screen').width * 8) / 10,
    borderColor: 'orange',
    borderWidth: 3,
    color: 'black',
    borderRadius: 15,
    fontSize: 30,
  },
  button: {
    marginTop: 300,
    width: (Dimensions.get('screen').width * 8) / 10,
  },
});

export default styles;
