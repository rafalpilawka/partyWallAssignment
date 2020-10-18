import React, {ReactElement, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {Button, TextInput, Text, Menu} from 'react-native-paper';
import {addItemAction} from 'src/store/items/items.actions';
import {TVariant} from 'src/store/items/items.types';
import {selectUser} from 'src/store/user/user.selector';
import {InputValidators} from 'src/utils/helpers/validators';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';

const AddScreen = (): ReactElement => {
  const user = useSelector(selectUser);
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [variant, setVariant] = useState<TVariant>('food');
  const [description, setDescription] = useState('');
  const [volume, setVolume] = useState('');
  const [weight, setWeight] = useState('');
  const [visible, setVisible] = useState(false);
  const uid = user?.uid;
  const [errors, setErrors] = React.useState(null);
  const dispatch = useDispatch();

  //TODO ADD FORMIK VALIDATION FOR YUP SCHEME AND CONVERT LOCAL STATES TO USE REDUCER

  const _toggleMenu = () => {
    setVisible((prev) => !prev);
  };
  const _setVariant = (variant: TVariant): void => {
    setVariant(variant);
    _toggleMenu();
  };
  const _addHandler = (): void => {
    const itemData = {
      name,
      price: +price,
      type,
    };
    if (variant === 'food') {
      InputValidators.addFoodItemScheme
        .validate(itemData)
        .then((_) => {
          dispatch(
            addItemAction({
              ...itemData,
              variant,
              createdBy: uid,
              description,
              weight: +weight,
            }),
          );
          _clearValues();
        })
        .catch((err) => setErrors(err));
    }
    if (variant === 'drink') {
      InputValidators.addDrinkItemScheme
        .validate(itemData)
        .then((_) => {
          dispatch(
            addItemAction({
              ...itemData,
              variant,
              createdBy: uid,
              volume: +volume,
            }),
          );
          _clearValues();
        })
        .catch((err) => console.warn(err));
    }
  };
  //TODO LATER ON MOVE ALL STATES TO FORMIK AND ADD CLEAR FORM HANDLER TO SAGA - AFTER SUBMITTING AND 200 CLEAR VALUES
  const _clearValues = (): void => {
    setPrice('');
    setName('');
    setType('');
    setVariant('food');
    setDescription('');
    setVolume('');
    setWeight('');
    setVisible(false);
  };

  const _renderVariant = () =>
    variant === 'food' ? (
      <>
        <TextInput
          label="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          mode="outlined"
          style={styles.input}
          multiline
        />
        <TextInput
          label="Weight"
          value={weight}
          onChangeText={(text) => setWeight(text)}
          mode="outlined"
          style={styles.input}
          keyboardType="decimal-pad"
        />
      </>
    ) : (
      <TextInput
        label="Volume"
        value={volume}
        onChangeText={(text) => setVolume(text)}
        mode="outlined"
        style={styles.input}
        keyboardType="decimal-pad"
      />
    );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <View style={{flex: 1}}>
          <ScrollView>
            <Menu
              style={[styles.menu]}
              visible={visible}
              onDismiss={_toggleMenu}
              anchor={
                <Pressable onPress={_toggleMenu}>
                  <TextInput
                    pointerEvents={'none'}
                    label="Main type"
                    value={variant}
                    disabled
                    style={styles.input}
                    textContentType="emailAddress"
                  />
                </Pressable>
              }>
              <Menu.Item
                onPress={() => _setVariant('food')}
                title="Food"
                style={{width: '100%'}}
              />
              <Menu.Item onPress={() => _setVariant('drink')} title="Drink" />
            </Menu>
            <TextInput
              label="Item name"
              value={name}
              onChangeText={(text) => setName(text)}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Type"
              value={type}
              onChangeText={(text) => setType(text)}
              mode="outlined"
              style={styles.input}
            />
            {_renderVariant()}
            <TextInput
              label="Price"
              value={price.toString()}
              onChangeText={(text) => setPrice(text)}
              mode="outlined"
              style={styles.input}
              textContentType="password"
              keyboardType="decimal-pad"
              onSubmitEditing={_addHandler}
            />
            {errors && (
              <Text style={{color: 'red'}}>
                There are some problems with form , please check it out
              </Text>
            )}
            <Button
              style={styles.buttonContainer}
              labelStyle={styles.buttonFont}
              icon="plus-circle"
              compact
              onPress={_addHandler}>
              ADD ITEM
            </Button>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddScreen;
