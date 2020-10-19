import React, {ReactElement, useEffect} from 'react';
import {View, Keyboard} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Screens from 'src/navigation/Screens';
import {Form} from 'src/components/Form/Form';
import {loginAction} from 'src/store/user/user.actions';
import {styles} from './styles';

export default function ({navigation}: any): ReactElement {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      _clearForm();
      Keyboard.dismiss();
    }
  }, [isFocused]);

  const _clearForm = () => {
    setEmail('');
    setPassword('');
  };

  const _navigationHandler = (): void => navigation.navigate(Screens.REGISTER);
  const _loginAction = (): void => {
    if (email.length && password.length) {
      dispatch(loginAction({email, password}));
    }
  };

  //TODO - ADD FORMIK AND YUP SCHEMAS VALIDATORS
  //TODO CONVERT TO FORM COMPONENT
  return (
    <Form>
      <SafeAreaView style={styles.flex}>
        <View style={styles.container}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            mode="outlined"
            style={styles.button}
            textContentType="emailAddress"
            autoCapitalize="none"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            mode="outlined"
            secureTextEntry={true}
            style={styles.button}
            onSubmitEditing={_loginAction}
          />
          <View style={styles.buttonsContainer}>
            <Button
              icon="login"
              compact
              labelStyle={styles.buttonFontSize}
              onPress={_loginAction}>
              Login
            </Button>
            <Button
              labelStyle={styles.buttonFontSize}
              icon="account-plus-outline"
              compact
              onPress={_navigationHandler}>
              Register
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </Form>
  );
}
