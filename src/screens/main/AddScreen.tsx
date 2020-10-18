import React, {ReactElement, useState} from 'react';
import {Pressable, ScrollView} from 'react-native';
import {Button, TextInput, Text, Menu} from 'react-native-paper';
import {addItemAction} from 'src/store/items/items.actions';
import {TVariant} from 'src/store/items/items.types';
import {selectUser} from 'src/store/user/user.selector';
import {InputValidators} from 'src/utils/helpers/validators';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';

const AddScreen = (): ReactElement => {
  const {uid} = useSelector(selectUser);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [variant, setVariant] = useState<TVariant>('food');
  const [description, setDescription] = useState('');
  const [volume, setVolume] = useState(0);
  const [weight, setWeight] = useState('');
  const [visible, setVisible] = useState(false);

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
      price,
      type,
    };
    debugger;
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
              volume,
            }),
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const _renderVariant = () =>
    variant === 'food' ? (
      <>
        <TextInput
          label="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          mode="outlined"
          style={styles.button}
          multiline
        />
        <TextInput
          label="Weight"
          value={weight}
          onChangeText={(text) => setWeight(text)}
          mode="outlined"
          style={styles.button}
          keyboardType="numeric"
        />
      </>
    ) : (
      <TextInput
        label="Volume"
        value={volume.toString()}
        onChangeText={(text) => setVolume(+text)}
        mode="outlined"
        style={styles.button}
        keyboardType="numeric"
      />
    );

  return (
    <SafeAreaView style={styles.container}>
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
                style={styles.button}
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
          style={styles.button}
        />
        <TextInput
          label="Type"
          value={type}
          onChangeText={(text) => setType(text)}
          mode="outlined"
          style={styles.button}
        />
        {_renderVariant()}
        <TextInput
          label="Price"
          value={price.toString()}
          onChangeText={(text) => setPrice(+text)}
          mode="outlined"
          style={styles.button}
          textContentType="password"
          keyboardType="numeric"
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
    </SafeAreaView>
  );
};

export default AddScreen;
