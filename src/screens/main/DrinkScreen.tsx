import React, {ReactElement, useEffect} from 'react';
import ListComponent from 'src/components/List/List';
import {Variants} from 'src/constants/variants';
import {getCollectionAction} from 'src/store/items/items.actions';
import {Text, View} from 'react-native';
import {selectDrinks} from 'src/store/items/items.selector';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';

const DrinkScreen = (): ReactElement => {
  const list = useSelector(selectDrinks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCollectionAction(Variants.DRINK));
  }, []);

  //TODO ADD FORMIK VALIDATION FOR YUP SCHEME AND CONVERT LOCAL STATES TO USE REDUCER
  //TODO ADD REFRESHING ON FOCUS
  return (
    <SafeAreaView style={styles.container}>
      {list.length ? (
        <ListComponent list={list} variant={Variants.DRINK} />
      ) : (
        <View style={styles.container}>
          <Text>THIS LIST IS EMPTY RIGHT NOW</Text>
          <Text>DONT HESITATE TO ADD SOME STUFF</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default DrinkScreen;
