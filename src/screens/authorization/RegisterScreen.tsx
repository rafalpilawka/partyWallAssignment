import React, {ReactElement, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Keyboard, View} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {Form} from 'src/components/Form/Form';
import {registerAction} from 'src/store/user/user.actions';
import {InputValidators} from 'src/utils/helpers/validators';
import {styles} from './styles';

export default function ({navigation}: any): ReactElement {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setConfirmation] = React.useState('');
  const [errors, setErrors] = React.useState(null);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  //TODO ADD FORMIK VALIDATION FOR YUP SCHEME AND CONVERT LOCAL STATES TO USE REDUCER

  useEffect(() => {
    if (!isFocused) {
      _clearForm();
      Keyboard.dismiss();
    }
  }, [isFocused]);

  const _clearForm = () => {
    setEmail('');
    setName('');
    setSurname('');
    setConfirmation('');
    setPassword('');
    setErrors(null);
  };
  const _navigationHandler = (): void => navigation.goBack();
  const _registerHandler = (): void => {
    const registerData = {
      email,
      name,
      surname,
      password,
      passwordConfirmation,
    };
    InputValidators.registerScheme
      .validate(registerData)
      .then((_) => {
        dispatch(registerAction(registerData));
      })
      .catch((err) => setErrors(err));
  };

  return (
    <Form>
      <SafeAreaView style={styles.flex}>
        <View style={styles.container}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            style={styles.button}
            textContentType="emailAddress"
            autoCapitalize="none"
          />
          <TextInput
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            mode="outlined"
            style={styles.button}
            textContentType="name"
          />
          <TextInput
            label="Surname"
            value={surname}
            onChangeText={(text) => setSurname(text)}
            mode="outlined"
            style={styles.button}
            textContentType="name"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            mode="outlined"
            secureTextEntry={true}
            style={styles.button}
            textContentType="password"
          />
          <TextInput
            label="Password Confirmation"
            value={passwordConfirmation}
            onChangeText={(text) => setConfirmation(text)}
            mode="outlined"
            secureTextEntry={true}
            style={styles.button}
            textContentType="password"
          />
          {errors && (
            <Text style={{color: 'red'}}>
              There are some problems with form , please check it out
            </Text>
          )}
          <View style={styles.buttonsContainer}>
            <Button
              icon="login"
              compact
              labelStyle={styles.buttonFontSize}
              onPress={_navigationHandler}>
              Login
            </Button>
            <Button
              labelStyle={styles.buttonFontSize}
              icon="account-plus-outline"
              compact
              onPress={_registerHandler}>
              Register
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </Form>
  );
}
