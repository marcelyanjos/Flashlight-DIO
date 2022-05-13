import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(false); //false
  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);
  useEffect(() => {
    //liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    // quando o celular for chacoalhado, mudaremos o toggle
    const subsciption = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });
    //Esta função vai ser chamada quando o componente for ser desmontado
    return () => subsciption.remove();
  }, []);

  //if toggle return light
  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={toggle ? style.lightingOff : style.lightingOn}
          source={
            toggle
              ? require('./assets/flash_on.png')
              : require('./assets/flash_off.png')
          }
        />
        <Image
          style={style.dioLogo}
          source={
            toggle
              ? require('./assets/dio_color.png')
              : require('./assets/dio_white.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};
export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});
