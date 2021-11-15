import * as React from 'react';
import * as Font from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

export default function useCachedResources() {
  
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Hook to Load any resources or data that we need prior to rendering the app\
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // To Keep the splash screen visible while we fetch resources
        SplashScreen.preventAutoHideAsync();
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'montreal': require('../assets/fonts/Montreal-Regular.ttf'),
        });
      } catch (e) {
        console.log(e);
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        // hide the splash screen once the background tasks are being completed.
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
