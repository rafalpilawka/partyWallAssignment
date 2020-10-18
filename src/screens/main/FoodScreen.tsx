import React, {ReactElement, useEffect} from 'react';
import {Pressable} from 'react-native';
import {Text} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import ListComponent from 'src/components/List/List';
import {Variants} from 'src/constants/variants';
import {getCollectionAction} from 'src/store/items/items.actions';
import {selectFood} from 'src/store/items/items.selector';
import {logoutAction} from 'src/store/user/user.actions';
import {styles} from './styles';

const FoodScreen = (): ReactElement => {
  const list = useSelector(selectFood);
  const dispatch = useDispatch();

  const _logoutHandler = () => dispatch(logoutAction());

  useEffect(() => {
    dispatch(getCollectionAction(Variants.FOOD));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={_logoutHandler}>
        <Avatar.Text size={60} label="XD" />
        {list.length ? (
          <ListComponent list={list} variant={Variants.FOOD} />
        ) : (
          <>
            <Text>THIS LIST IS EMPTY RIGHT NOW</Text>
            <Text>DONT HESITATE TO ADD SOME STUFF</Text>
          </>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

export default FoodScreen;
