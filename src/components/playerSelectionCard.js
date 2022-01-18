import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

import Text from '../components/text'
import { colors } from '../theme'

export default function PlayerSelectionCard({ name, thumb, color, inactive }) {
  return (
    <View style={[styles.card, inactive && styles.inactiveCard]}>
      <Image
        source={thumb}
        resizeMode='contain'
        style={{ height: 80, width: 80 }}
      />
      <View style={styles.content}>
        <Text>{name}</Text>
        {!inactive && (
          <View style={[styles.badge, { backgroundColor: color }]} />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.dark,
    flexDirection: 'row',
    height: 80,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    width: '100%',
  },
  inactiveCard: {
    opacity: 0.3,
  },
  content: {
    flex: 1,
    // backgroundColor: '#f44',
    // padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    marginTop: 10,
    width: 30,
    height: 10,
    borderRadius: 100,
  },
})
