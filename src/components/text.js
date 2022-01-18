import React from 'react'
import { StyleSheet, Text as RNText } from 'react-native'

import { colors } from '../theme'
export default function Text({ style, ...props }) {
  return <RNText style={[styles.text, style]} {...props} />
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: colors.light,
  },
})
