import React, {ReactElement} from 'react';
import {List} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {styles} from 'src/components/Item/styles';
import {IDrink, IFood, TVariant} from 'src/store/items/items.types';
import {selectUserId} from 'src/store/user/user.selector';

type TProps = {
  item: IFood | IDrink;
  variant: TVariant;
  handleRemoveItem(id: string): void;
  handleEditItem(id: string): void;
};
const ItemComponent = ({
  item,
  variant,
  handleRemoveItem,
  handleEditItem,
}: TProps): ReactElement => {
  const [expanded, setExpanded] = React.useState(false);
  const userId = useSelector(selectUserId);
  const _generateHeader =
    variant === 'food'
      ? `${item.type}  /  $ ${item.type}  /  ${(item as IFood).weight}g`
      : `${item.type}  /  $ ${item.type} / ${(item as IDrink).volume}ml`;
  const _handlePress = () => setExpanded((prev) => !prev);
  const _handleRemove = () => item.id && handleRemoveItem(item.id);
  const _handleEdit = () => item.id && handleEditItem(item.id);
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
        {item.createdBy === userId && _renderDeleteSelection()}
      </>
    ) : null;

  const _renderDeleteSelection = () => (
    <>
      <List.Item
        onPress={() => console.log('UPDATE')}
        style={styles.paddingElements}
        titleStyle={styles.itemsFont}
        title={''}
        left={(props: any) => (
          <List.Icon
            {...props}
            style
            icon="square-edit-outline"
            onPress={_handleEdit}
            titleStyle={'Edit'}
          />
        )}
        right={(props: any) => (
          <List.Icon
            {...props}
            style
            icon="delete"
            onPress={_handleRemove}
            title={'REMOVE'}
          />
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
