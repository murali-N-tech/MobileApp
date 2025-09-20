import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'; // 👈 Import this

export default function App() {
  return (
    <Provider store={store}>
      {/* 👇 Wrap your navigator with this container 👇 */}
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootNavigator />
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  );
}