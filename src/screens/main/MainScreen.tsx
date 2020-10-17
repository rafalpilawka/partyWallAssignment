import React, {ReactElement} from 'react';
import {Alert, View} from 'react-native';
import {Button, Avatar} from 'react-native-paper';
import Screens from 'src/navigation/Screens';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';

const MainScreen = ({navigation}: any): ReactElement => {
  //   React.useEffect(() => {
  //     console.log(navigation);
  //     return () => {};
  //   }, []);

  const _navigationHandler = (): void => navigation.navigate(Screens.LOGIN);
  const _registerHandler = (): void => {
    Alert.alert('register');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Avatar.Text size={60} label="XD" />
      {/*<TextInput*/}
      {/*  label="Product name"*/}
      {/*  value={credentials}*/}
      {/*  onChangeText={(text) => setEmail(text)}*/}
      {/*  mode="outlined"*/}
      {/*  style={styles.button}*/}
      {/*/>*/}

      <View style={styles.buttonsContainer}>
        <Button icon="login" compact onPress={_navigationHandler}>
          Login
        </Button>
        <Button icon="account-plus-outline" compact onPress={_registerHandler}>
          Register
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;
