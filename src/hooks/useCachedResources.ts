import {Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {User} from 'firebase';
import * as React from 'react';
import store from 'src/store/rootStore';
import {setupUserAction, switchLoader} from 'src/store/user/user.actions';
import {auth} from 'src/utils/services/api/firebase';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  if (!isLoadingComplete) store.dispatch(switchLoader(true));
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
        });
        auth.onAuthStateChanged(async (res: any) => {
          if (res) {
            const {uid, email}: User = res;
            store.dispatch(setupUserAction(uid, email!));
          }
        });
      } catch (e) {
        console.warn(e);
      } finally {
        store.dispatch(switchLoader(false));
        setLoadingComplete(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync().then(() => {});
  }, []);

  return isLoadingComplete;
}
