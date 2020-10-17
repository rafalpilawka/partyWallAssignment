import {StatusBar} from 'expo-status-bar';
import {User} from 'firebase';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {setupUserAction} from 'src/store/user/user.actions';
import Navigation from './src/navigation/RootNavigator';
import useCachedResources from './src/hooks/useCachedResources';
import {Provider as ReduxProvider} from 'react-redux';
import {auth} from 'src/utils/services/api/firebase';
import store from 'src/store/rootStore';

//TODO IMPLEMENT DARK LIGHT THEME

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

  useEffect(() => {
    auth.onAuthStateChanged(async (res: User | null) => {
      if (res) {
        const {uid, email}: User = res;
        store.dispatch(setupUserAction(uid, email!));
      } else if (res) {
      }
    });
  }, []);

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
