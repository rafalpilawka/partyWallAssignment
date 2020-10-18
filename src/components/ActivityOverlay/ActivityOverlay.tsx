import React from 'react';
import {View} from 'react-native';
import {Portal, ActivityIndicator} from 'react-native-paper';

const ActivityOverlayComponent = () => {
  return (
    <Portal>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(256, 256, 256, 0.6)',
        }}>
        <ActivityIndicator size={60} />
      </View>
    </Portal>
  );
};
export default ActivityOverlayComponent;
