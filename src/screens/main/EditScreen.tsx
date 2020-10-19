import React, {ReactElement, useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {goBack, resetParams} from 'src/navigation/topLevelNavigator';
import {Form} from 'src/components/Form/Form';
import {setActiveItem, updateItemAction} from 'src/store/items/items.actions';
import {selectActiveItem} from 'src/store/items/items.selector';
import {IDrink, IFood} from 'src/store/items/items.types';
import {selectUser} from 'src/store/user/user.selector';
import {InputValidators} from 'src/utils/helpers/validators';
import {styles} from 'src/screens/main/styles';

//TODO ADD CALLBACKS FROM SAGA
//TODO ADD DISMISS ON MODAL OUTSIDE CONTAINER
// type Props = {route: RouteType<any>};

const EditScreen = (): ReactElement => {
  const res = useSelector(selectActiveItem);
  const {uid} = useSelector(selectUser);
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [volume, setVolume] = useState('');
  const [weight, setWeight] = useState('');
  const [errors, setErrors] = React.useState(null);
  const [variant, setVariant] = useState('');
  const [itemID, setItemID] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (res) {
      const {variant: V, item} = res;
      setVariant(V);
      if (item) {
        setPrice(item.price.toString());
        setName(item.name);
        setType(item.type);
        setDescription(
          (item as IFood)?.description ? (item as IFood)?.description : '',
        );
        setVolume(
          (item as IDrink).volume ? (item as IDrink)?.volume.toString() : '',
        );
        setWeight(
          (item as IFood).weight ? (item as IFood).weight.toString() : '',
        );
        setItemID(item.id ? item.id : '');
      }
    }
  }, [res]);

  const _dismissHandler = () => {
    resetParams();
    dispatch(setActiveItem(null));
    goBack();
  };
  const _submitHandler = (): void => {
    const itemData = {
      name,
      price: +price,
      type,
    };
    debugger;
    if (variant === 'food') {
      InputValidators.addFoodItemScheme
        .validate(itemData)
        .then((_) => {
          dispatch(
            updateItemAction({
              ...itemData,
              variant,
              description,
              createdBy: uid,
              weight: +weight,
              id: itemID,
            }),
          );
          _dismissHandler();
        })
        .catch((err) => setErrors(err));
    }
    if (variant === 'drink') {
      InputValidators.addDrinkItemScheme
        .validate(itemData)
        .then((_) => {
          dispatch(
            updateItemAction({
              ...itemData,
              variant,
              volume: +volume,
              createdBy: uid,
              id: itemID,
            }),
          );
          _dismissHandler();
        })
        .catch((err) => console.warn(err));
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
          style={styles.input}
          multiline
        />
        <TextInput
          label="Weight"
          value={weight.toString()}
          onChangeText={(text) => setWeight(text)}
          mode="outlined"
          style={styles.input}
          keyboardType="numeric"
        />
      </>
    ) : (
      <TextInput
        label="Volume"
        value={volume.toString()}
        onChangeText={(text) => setVolume(text)}
        mode="outlined"
        style={styles.input}
        keyboardType="numeric"
      />
    );

  return res ? (
    <Form>
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1}}>
          <ScrollView>
            <TextInput
              pointerEvents={'none'}
              label="Main type"
              value={variant}
              disabled
              style={styles.input}
            />
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
              keyboardType="numeric"
              onSubmitEditing={_submitHandler}
            />
            {errors && (
              <Text style={{color: 'red'}}>
                There are some problems with form , please check it out
              </Text>
            )}
            <View style={styles.buttonsContainer}>
              <Button
                style={styles.buttonContainer}
                labelStyle={styles.buttonFont}
                icon="close-circle-outline"
                compact
                onPress={_dismissHandler}>
                DISMISS
              </Button>
              <Button
                style={styles.buttonContainer}
                labelStyle={styles.buttonFont}
                icon="plus-circle"
                compact
                onPress={_submitHandler}>
                SUBMIT
              </Button>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Form>
  ) : (
    <></>
  );
};
export default EditScreen;
