import React, {ReactElement} from 'react';
import {Alert, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Screens from 'src/navigation/Screens';
import {styles} from './styles';

export default function ({navigation}: any): ReactElement {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setConfirmation] = React.useState('');

  //   React.useEffect(() => {
  //     console.log(navigation);
  //     return () => {};
  //   }, []);

  const _navigationHandler = (): void => navigation.navigate(Screens.LOGIN);
  const _registerHandler = (): void => {
    Alert.alert('register');
  };
  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
        style={styles.button}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        mode="outlined"
        secureTextEntry={true}
        style={styles.button}
      />
      <TextInput
        label="Password Confirmation"
        value={passwordConfirmation}
        onChangeText={(text) => setConfirmation(text)}
        mode="outlined"
        secureTextEntry={true}
        style={styles.button}
      />
      <View style={styles.buttonsContainer}>
        <Button icon="login" compact onPress={_navigationHandler}>
          Login
        </Button>
        <Button icon="account-plus-outline" compact onPress={_registerHandler}>
          Register
        </Button>
      </View>
    </View>
  );
}
