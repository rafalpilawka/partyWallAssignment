import React from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import Navigation from 'src/navigation/RootNavigator';
import {Provider as ReduxProvider} from 'react-redux';
import useCachedResources from 'src/hooks/useCachedResources';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';

import store from 'src/store/rootStore';

//TODO IMPLEMENT DARK LIGHT THEME
//TODO ADD IMPLEMENTATION FOr GLOBAL STYLES WITH FONT SIZES AND OTHER PROPS

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#330066',
    accent: '#f1c40f',
  },
};

//TODO NEED TO ADD CUSTOM HEADER FOR COMPONENTS

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ReduxProvider store={store}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <StatusBar style="auto" />
            <Navigation />
          </SafeAreaProvider>
        </PaperProvider>
      </ReduxProvider>
    );
  }
}
