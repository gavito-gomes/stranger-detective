import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors } from '../theme'

import Text from './text'

export default function Button({
  children,
  disabled,
  textStyle,
  style,
  fluid,
  ...props
}) {
  return (
    <View style={disabled && { opacity: 0.4 }}>
      <TouchableOpacity
        disabled={disabled}
        {...props}
        style={[styles.button, style]}
      >
        <Text style={[styles.text, textStyle]}>{children}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  text: {
    textTransform: 'uppercase',
    // fontWeight: 'bold',
  },
})
