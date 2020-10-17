import {Store} from 'src/contexts/contexts';
import Screens from 'src/navigation/Screens';
import React, {ReactElement} from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {styles} from './styles';

export default function ({navigation}: any): ReactElement {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {user, setUser} = React.useContext(Store);

  const _navigationHandler = (): void => navigation.navigate(Screens.REGISTER);
  const _loginAction = (): void => setUser(() => !user);

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        mode="outlined"
        style={styles.button}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text: string) => setPassword(text)}
        mode="outlined"
        secureTextEntry={true}
        style={styles.button}
      />
      <View style={styles.buttonsContainer}>
        <Button icon="login" compact onPress={_loginAction}>
          Login
        </Button>
        <Button
          icon="account-plus-outline"
          compact
          onPress={_navigationHandler}>
          Register
        </Button>
      </View>
    </View>
  );
}
