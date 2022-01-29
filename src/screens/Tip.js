import React from 'react'
import { StyleSheet, View } from 'react-native'
import Call from '../components/tips/Call'
import Message from '../components/tips/Message'

export default function Tip({ route, navigation }) {
  const { tipParams } = route.params
  // console.log('tip params ', tipParams)

  return Math.random() > 0.45 ? (
    <Call tipParams={tipParams} refuse={() => navigation.goBack()} />
  ) : (
    <Message tipParams={tipParams} refuse={() => navigation.goBack()} />
  )
}

const styles = StyleSheet.create({})
