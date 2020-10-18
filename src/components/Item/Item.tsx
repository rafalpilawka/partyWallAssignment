import React, {ReactElement} from 'react';
import {Pressable} from 'react-native';
import {List} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {styles} from 'src/components/Item/styles';
import {IDrink, IFood, TVariant} from 'src/store/items/items.types';
import {selectUser} from 'src/store/user/user.selector';

type TProps = {
  item: IFood | IDrink;
  variant: TVariant;
  handleRemoveItem(id: string): void;
  handleEditItem(item: IFood | IDrink): void;
};

const ItemComponent = ({
  item,
  variant,
  handleRemoveItem,
  handleEditItem,
}: TProps): ReactElement => {
  const [expanded, setExpanded] = React.useState(false);
  const user = useSelector(selectUser);
  const uid = user?.uid;
  const _generateHeader =
    variant === 'food'
      ? `${item.type}  /  $ ${item.price}  /  ${(item as IFood).weight}g`
      : `${item.type}  /  $ ${item.price} / ${(item as IDrink).volume}ml`;
  const _handlePress = () => setExpanded((prev) => !prev);
  const _handleRemove = () => item.id && handleRemoveItem(item.id);
  const _handleEdit = () => item.id && handleEditItem(item);
  const _variantRender = (): ReactElement | null =>
    variant === 'food' ? (
      <>
        <List.Item
          style={styles.paddingElements}
          titleStyle={styles.itemsFont}
          title={(item as IFood).description}
          left={(props: any) => (
            <List.Icon {...props} style icon="book-open-outline" />
          )}
        />
        {item.createdBy === uid && _renderDeleteSelection()}
      </>
    ) : (
      _renderDeleteSelection()
    );

  const _renderDeleteSelection = () => (
    <>
      <List.Item
        style={styles.paddingElements}
        titleStyle={styles.itemsFont}
        title={''}
        left={(props: any) => (
          <Pressable onPress={_handleEdit}>
            <List.Icon
              {...props}
              style
              icon="square-edit-outline"
              titleStyle={'Edit'}
            />
          </Pressable>
        )}
        right={(props: any) => (
          <Pressable onPress={_handleRemove}>
            <List.Icon {...props} style icon="delete" title={'REMOVE'} />
          </Pressable>
        )}
      />
    </>
  );

  return (
    <List.Accordion
      style={styles.separator}
      expanded={expanded}
      onPress={_handlePress}
      title={item.name}
      description={_generateHeader}
      left={(props: any) => <List.Icon {...props} icon="circle" />}>
      {_variantRender()}
    </List.Accordion>
  );
};

export default ItemComponent;
