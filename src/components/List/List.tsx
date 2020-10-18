import React, {ReactElement, useState} from 'react';
import {Alert, ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import EditModalComponent from 'src/components/EditModal/EditModal';
import {removeItemAction} from 'src/store/items/items.actions';
import {IDrink, IFood, TVariant} from 'src/store/items/items.types';
import ItemComponent from 'src/components/Item/Item';

type TProps = {
  list: IFood[] | IDrink[] | [];
  variant: TVariant;
};
const ListComponent = ({list, variant}: TProps): ReactElement => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IDrink | IFood | null>(null);
  const dispatch = useDispatch();
  const _handleRemoveItem = (id: string) => {
    Alert.alert(
      'Confirm remove',
      'Are you sure You want to remove this item?',
      [
        {
          text: 'Confirm',
          onPress: () => dispatch(removeItemAction(id, variant)),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const _handleEditItem = (item: IDrink | IFood) => {
    console.log(modalVisible, item);
    setSelectedItem(item);
    _toggleEditModal();
  };

  const _toggleEditModal = () => setModalVisible((prev) => !prev);
  const _handleDismissModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const _renderItems = () =>
    (list as Array<any>).map((item: IDrink | IFood) => (
      <ItemComponent
        key={item.id}
        item={item}
        variant={variant}
        handleRemoveItem={_handleRemoveItem}
        handleEditItem={_handleEditItem}
      />
    ));
  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>{variant.toUpperCase()}</List.Subheader>
        {_renderItems()}
      </List.Section>
      {selectedItem && (
        <EditModalComponent
          visible={modalVisible}
          item={selectedItem}
          onDismiss={_handleDismissModal}
          variant={variant}
        />
      )}
    </ScrollView>
  );
};

export default ListComponent;

//TODO FIX PADDING ON SCROLL VIEW
