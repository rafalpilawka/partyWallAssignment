import React, {ReactElement, useEffect} from 'react';
import ListComponent from 'src/components/List/List';
import {Variants} from 'src/constants/variants';
import {getCollectionAction} from 'src/store/items/items.actions';
import {selectFood} from 'src/store/items/items.selector';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';

const FoodScreen = (): ReactElement => {
  const list = useSelector(selectFood);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCollectionAction(Variants.FOOD));
  }, []);

  //TODO ADD FORMIK VALIDATION FOR YUP SCHEME AND CONVERT LOCAL STATES TO USE REDUCER

  return (
    <SafeAreaView style={styles.container}>
      <ListComponent list={list} variant={Variants.FOOD} />
    </SafeAreaView>
  );
};

export default FoodScreen;
