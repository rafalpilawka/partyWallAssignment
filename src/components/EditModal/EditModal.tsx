import React, {useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {Button, Card, Modal, Portal, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from 'src/components/EditModal/styles';
import {updateItemAction} from 'src/store/items/items.actions';
import {IDrink, IFood, TVariant} from 'src/store/items/items.types';
import {selectUser} from 'src/store/user/user.selector';
import {InputValidators} from 'src/utils/helpers/validators';

type TProps = {
  visible: boolean;
  onDismiss(): void;
  item: IDrink | IFood;
  variant: TVariant;
};

const EditModalComponent = ({visible, onDismiss, item, variant}: TProps) => {
  const {uid} = useSelector(selectUser);
  const [price, setPrice] = useState(item.price);
  const [name, setName] = useState(item.name);
  const [type, setType] = useState(item.name);
  const [description, setDescription] = useState((item as IFood).description);
  const [volume, setVolume] = useState((item as IDrink).volume);
  const [weight, setWeight] = useState((item as IFood).weight);
  const [errors, setErrors] = React.useState(null);
  const dispatch = useDispatch();

  const _submitHandler = (): void => {
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
            updateItemAction({
              ...itemData,
              variant,
              description,
              createdBy: uid,
              weight: +weight,
              id: item.id,
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
            updateItemAction({
              ...itemData,
              variant,
              volume,
              createdBy: uid,
              id: item.id,
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
          value={weight.toString()}
          onChangeText={(text) => setWeight(+text)}
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

  const _renderContent = () => {
    return (
      <>
        <ScrollView keyboardShouldPersistTaps={'always'}>
          <TextInput
            pointerEvents={'none'}
            label="Main type"
            value={variant}
            disabled
            style={styles.button}
          />
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
            onSubmitEditing={_submitHandler}
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
            onPress={_submitHandler}>
            SUBMIT
          </Button>
          <Button
            style={styles.buttonContainer}
            labelStyle={styles.buttonFont}
            icon="close-circle-outline"
            compact
            onPress={onDismiss}>
            DISMISS
          </Button>
        </ScrollView>
      </>
    );
  };
  return (
    <Portal>
      <Modal
        contentContainerStyle={styles.containerStyle}
        visible={visible}
        dismissable={true}
        onDismiss={onDismiss}>
        <Card style={{width: '100%'}}>
          <Card.Title title={'EDIT ITEM'} />
          <Card.Content>{_renderContent()}</Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};
export default EditModalComponent;
