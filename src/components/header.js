import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import Button from './button'
import Text from './text'
import { colors } from '../theme'

export default function Header({ children, onReturn, ...props }) {
  return (
    <View style={styles.header} {...props}>
      <Button style={styles.backButton} onPress={onReturn}>
        <MaterialIcons name='arrow-back' size={25} />
      </Button>
      <View style={styles.content}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.dark,
    padding: 15,
    paddingTop: 30,
    flexDirection: 'row',
  },
  backButton: {
    // backgroundColor: '#FFF',
    backgroundColor: 'transparent',
  },
  content: {
    // backgroundColor: '#ff4',
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 50,
  },
  text: {
    fontSize: 18,
    textTransform: 'uppercase',
  },
})
