import { useFocusEffect } from '@react-navigation/core'
import React, { useCallback } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { useDispatch } from 'react-redux'

import Logo from '../../assets/logo.png'
import Button from '../components/button'
import { persistor, reset } from '../store'

export default function Home({ navigation }) {
  const dispatch = useDispatch()

  const goto = (name) => {
    navigation.navigate(name)
  }

  useFocusEffect(
    useCallback(() => {
      dispatch(reset())
    }, [])
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image source={Logo} resizeMode='contain' style={styles.logo} />
      </View>
      <View style={styles.body}>
        <Button style={styles.button} onPress={() => goto('Settings')}>
          Configurações
        </Button>
        <Button style={styles.button} onPress={() => goto('PlayerSelection')}>
          Começar
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    // backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 200,
    paddingBottom: 50,
  },
  logo: {
    width: 300,
    height: 100,
  },
  body: {
    // backgroundColor: '#fff',
    flex: 1,
    width: 300,
    paddingTop: 100,
    alignSelf: 'center',
  },
  button: {
    width: '100%',
    marginBottom: 20,
  },
})
