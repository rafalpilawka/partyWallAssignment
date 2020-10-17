import React, {ReactElement} from 'react';
import {Pressable} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {logoutAction} from 'src/store/user/user.actions';
import {styles} from './styles';

const MainScreen = ({navigation}: any): ReactElement => {
  const dispatch = useDispatch();
  const _logoutHandler = () => dispatch(logoutAction());

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={_logoutHandler}>
        <Avatar.Text size={60} label="XD" />
      </Pressable>
    </SafeAreaView>
  );
};

export default MainScreen;
