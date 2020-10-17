import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import Navigation from './src/navigation/RootNavigator';
import useCachedResources from './src/hooks/useCachedResources';
import {Store} from 'src/contexts/contexts';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#330066',
    accent: '#f1c40f',
  },
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [user, setUser] = React.useState(false);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Store.Provider value={{user, setUser}}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <StatusBar style="auto" />
            <Navigation />
          </SafeAreaProvider>
        </PaperProvider>
      </Store.Provider>
    );
  }
}
