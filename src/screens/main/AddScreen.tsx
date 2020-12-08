import React, {ReactElement, useEffect, useState} from 'react';
import {Keyboard, Pressable, ScrollView, View} from 'react-native';
import {Button, TextInput, Text, Menu} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Form} from 'src/components/Form/Form';
import {addItemAction} from 'src/store/items/items.actions';
import {TVariant} from 'src/store/items/items.types';
import {selectUser} from 'src/store/user/user.selector';
import {InputValidators} from 'src/utils/helpers/validators';
import {styles} from './styles';
import {TInputNames, useEditValues} from 'src/hooks/useEditValues';

const AddScreen = (): ReactElement => {
  const user = useSelector(selectUser);
  const {values, setValues, clearValues} = useEditValues();
  const [type, setType] = useState('');
  const [variant, setVariant] = useState<TVariant>('food');
  const [visible, setVisible] = useState(false);
  const uid = user?.uid;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      _clearForm();
      Keyboard.dismiss();
    }
  }, [isFocused]);

  const _clearForm = () => {
    clearValues();
    setType('');
    setVisible(false);
  };

  //TODO ADD FORMIK VALIDATION FOR YUP SCHEME AND CONVERT LOCAL STATES TO USE REDUCER

  const _toggleMenu = () => {
    setVisible((prev) => !prev);
  };
  const _setVariant = (variant: TVariant): void => {
    setVariant(variant);
    _toggleMenu();
  };

  const _setValue = (text: string, inputName: keyof TInputNames) => {
    const valuesObject = {...values, [inputName]: text};
    setValues(valuesObject);
  };
  const _addHandler = (): void => {
    const itemData = {
      name,
      price: +values.price,
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
              description: values.description,
              weight: +values.weight,
            }),
          );
          _clearValues();
        })
        .catch((err) => _setValue(err, 'errors'));
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
              volume: +values.volume,
            }),
          );
          _clearValues();
        })
        .catch((err) => console.warn(err));
    }
  };
  //TODO LATER ON MOVE ALL STATES TO FORMIK AND ADD CLEAR FORM HANDLER TO SAGA - AFTER SUBMITTING AND 200 CLEAR VALUES
  const _clearValues = (): void => {
    setType('');
    setVariant('food');
    setVisible(false);
  };

  const _renderVariant = () =>
    variant === 'food' ? (
      <>
        <TextInput
          label="Description"
          value={values.description}
          onChangeText={(text) => _setValue(text, 'description')}
          mode="outlined"
          style={styles.input}
          multiline
        />
        <TextInput
          label="Weight"
          value={values.weight}
          onChangeText={(text) => _setValue(text, 'weight')}
          mode="outlined"
          style={styles.input}
          keyboardType="decimal-pad"
        />
      </>
    ) : (
      <TextInput
        label="Volume"
        value={values.volume}
        onChangeText={(text) => _setValue(text, 'volume')}
        mode="outlined"
        style={styles.input}
        keyboardType="decimal-pad"
      />
    );

  return (
    <Form>
      <SafeAreaView style={styles.container}>
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
              value={values.name}
              onChangeText={(text) => _setValue(text, 'name')}
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
              value={values.price.toString()}
              onChangeText={(text) => _setValue(text, 'price')}
              mode="outlined"
              style={styles.input}
              textContentType="password"
              keyboardType="decimal-pad"
              onSubmitEditing={_addHandler}
            />
            {values.errors && (
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
      </SafeAreaView>
    </Form>
  );
};

export default AddScreen;
