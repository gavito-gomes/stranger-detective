import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av'
import Text from '../text'
import { colors } from '../../theme'
import { MaterialIcons } from '@expo/vector-icons'

export default function Message({ tipParams, refuse }) {
  const { player, tip } = tipParams
  const [accepted, setaccepted] = useState(false)

  const [notificationBell, setnotificationBell] = useState()

  const playNotificationBell = async () => {
    console.log('Loading Notification Bell')
    const { sound } = await Audio.Sound.createAsync(
      require('../../../assets/audio/notification.mp3'),
      {
        isLooping: true,
      }
    )
    setnotificationBell(sound)

    console.log('Playing Notification Bell')
    await sound.playAsync()
  }

  // play the notification bell
  useEffect(() => {
    if (!notificationBell) playNotificationBell()
    return () => {
      console.log('Unloading Notification Bell')
      notificationBell?.unloadAsync()
    }
  }, [notificationBell])

  // if accepted stop the notificationBell
  useEffect(() => {
    if (accepted) {
      try {
        notificationBell?.stopAsync()
      } catch (error) {
        console.log(error)
      }
    }
  }, [accepted])

  const acceptMessage = () => {
    setaccepted(true)
  }

  return (
    <View style={styles.container}>
      <View style={styles.headline}>
        <Text style={styles.title}>Mensagem de texto</Text>
      </View>

      <View style={[styles.characters, { marginTop: accepted ? 80 : 120 }]}>
        <View style={styles.character}>
          <MaterialIcons name='mail' size={100} color={colors.light} />
          <Text style={styles.name}>Anônimo</Text>
        </View>
        <View style={styles.arrow}>
          <MaterialIcons name='double-arrow' size={30} color={colors.light} />
        </View>
        <View style={styles.character}>
          <Image source={player.thumb} style={styles.thumb} />
          <Text style={styles.name}>{player.name}</Text>
        </View>
      </View>

      {accepted && (
        <View style={styles.message}>
          <View style={styles.messageTail}></View>
          <Text style={{ color: colors.dark }}>{tip.text}</Text>
        </View>
      )}

      <View
        style={[
          styles.action,
          {
            marginTop: accepted ? 20 : 150,
          },
        ]}
      >
        <TouchableOpacity disabled={accepted} onPress={acceptMessage}>
          <View
            style={[
              styles.roundButton,
              {
                backgroundColor: accepted ? '#888' : '#5BD55F',
                opacity: accepted ? 0.3 : 1,
              },
            ]}
          >
            <MaterialIcons name='drafts' size={40} color={colors.light} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => refuse()}>
          <View style={[styles.roundButton, { backgroundColor: '#EF5353' }]}>
            <MaterialIcons name='close' size={40} color={colors.light} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headline: {
    backgroundColor: colors.dark,
    padding: 35,
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 18,
    textAlign: 'center',
  },
  characters: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '70%',
  },
  arrow: { flexDirection: 'row', marginHorizontal: 30, marginBottom: 50 },
  character: {
    alignItems: 'center',
    // backgroundColor: '#f44',
  },
  thumb: {
    width: 120,
    height: 120,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 100,
  },
  name: {
    fontSize: 18,
    marginTop: 10,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 100,
    margin: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginTop: 40,
    minHeight: 150,
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 5,
    backgroundColor: colors.light,
    position: 'relative',
  },
  messageTail: {
    position: 'absolute',
    top: -30,
    left: 95,
    borderWidth: 15,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.light,
  },
})
