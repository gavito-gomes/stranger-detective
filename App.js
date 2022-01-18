import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, ImageBackground, View } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/store'

import Router from './src/router'
import background from './assets/background.png'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ImageBackground
          source={background}
          resizeMode='cover'
          style={styles.container}
        >
          <StatusBar style='light' />
          <View style={styles.container}>
            <Router />
          </View>
        </ImageBackground>
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 18,
  },
})
