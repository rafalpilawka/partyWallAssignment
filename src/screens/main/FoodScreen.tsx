import React, {ReactElement, useEffect} from 'react';
import {Pressable, View} from 'react-native';
import {Text} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import ListComponent from 'src/components/List/List';
import {Variants} from 'src/constants/variants';
import {getCollectionAction} from 'src/store/items/items.actions';
import {selectFood} from 'src/store/items/items.selector';
import {styles} from './styles';

const FoodScreen = ({navigation}: any): ReactElement => {
  const list = useSelector(selectFood);
  const dispatch = useDispatch();

  const _toggleDrawer = () => navigation.toggleDrawer();

  useEffect(() => {
    dispatch(getCollectionAction(Variants.FOOD));
  }, []);

  //TODO ADD REFRESHING ON FOCUS

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={_toggleDrawer}>
        <Avatar.Icon size={40} icon={'account-circle-outline'} />
        {list.length ? (
          <ListComponent list={list} variant={Variants.FOOD} />
        ) : (
          <View style={styles.container}>
            <Text>THIS LIST IS EMPTY RIGHT NOW</Text>
            <Text>DONT HESITATE TO ADD SOME STUFF</Text>
          </View>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

export default FoodScreen;
