import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av'
import { useInterval } from '../../hooks'
import Text from '../text'
import { colors } from '../../theme'
import Anonimo from '../../../assets/thumbs/anonimo.jpg'
import { MaterialIcons } from '@expo/vector-icons'
import moment from 'moment'

export default function Call({ tipParams, refuse }) {
  const { player, tip } = tipParams
  const [accepted, setaccepted] = useState(false)
  const [tipIsPlaying, settipIsPlaying] = useState(false)
  const [timePassed, settimePassed] = useState(0)

  const [ringtone, setringtone] = useState()
  const [audioTip, setaudioTip] = useState()

  const playRingtone = async () => {
    console.log('Loading Ringtone')
    const { sound } = await Audio.Sound.createAsync(
      require('../../../assets/audio/ringtone.mp3'),
      {
        isLooping: true,
      }
    )
    setringtone(sound)

    console.log('Playing Ringtone')
    await sound.playAsync()
  }

  const playAudioTip = async () => {
    console.log('Loading audio tip')
    try {
      console.log('set ear')
      await Audio.setAudioModeAsync({
        playThroughEarpieceAndroid: true,
      })
      const { sound } = await Audio.Sound.createAsync({
        uri: tip.audioURI,
      })
      sound.setVolumeAsync()
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          console.log('unset ear')
          Audio.setAudioModeAsync({
            playThroughEarpieceAndroid: false,
          })
        }
      })

      setaudioTip(sound)
      console.log('Playing audio tip')
      sound.playAsync()
    } catch (error) {
      console.log('err', error)
    }
  }

  const replay = async () => {}

  // if accepted, play the tip
  useEffect(() => {
    if (!audioTip && accepted) playAudioTip()
    return () => {
      console.log('Unloading audio tip')
      audioTip?.unloadAsync()
    }
  }, [audioTip, accepted])

  // play the ringtone
  useEffect(() => {
    if (!ringtone) playRingtone()
    return () => {
      console.log('Unloading Ringtone')
      ringtone?.unloadAsync()
    }
  }, [ringtone])

  // if accepted stop the ringtone
  useEffect(() => {
    if (accepted) {
      try {
        ringtone?.stopAsync()
      } catch (error) {
        console.log(error)
      }
    }
  }, [accepted])

  const acceptCall = () => {
    setaccepted(true)
  }

  useInterval(() => {
    if (accepted) settimePassed((time) => time + 1000)
  }, 1000)

  return (
    <View style={styles.container}>
      <View style={styles.headline}>
        <Text style={styles.title}>Chamada de voz</Text>
      </View>

      {accepted && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.title}>
            {moment()
              .startOf('day')
              .add(timePassed, 'milliseconds')
              .format('mm:ss')}
          </Text>
        </View>
      )}

      <View style={[styles.characters, { marginTop: accepted ? 80 : 120 }]}>
        <View style={styles.character}>
          <Image source={Anonimo} style={styles.thumb} />
          <Text style={styles.name}>Anônimo</Text>
        </View>
        {!accepted && (
          <View style={{ flexDirection: 'row', marginHorizontal: 30 }}>
            <MaterialIcons name='double-arrow' size={30} color={colors.light} />
          </View>
        )}
        {!accepted && (
          <View style={styles.character}>
            <Image source={player.thumb} style={styles.thumb} />
            <Text style={styles.name}>{player.name}</Text>
          </View>
        )}
      </View>

      <View style={styles.action}>
        {accepted ? (
          <TouchableOpacity disabled={accepted} onPress={acceptCall}>
            <View
              style={[
                styles.roundButton,
                {
                  backgroundColor: accepted ? '#888' : '#5BD55F',
                  opacity: accepted ? 0.3 : 1,
                },
              ]}
            >
              <MaterialIcons name='phone' size={40} color={colors.light} />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled={tipIsPlaying} onPress={replay}>
            <View
              style={[
                styles.roundButton,
                {
                  backgroundColor: tipIsPlaying ? '#888' : '#5BD55F',
                  opacity: tipIsPlaying ? 0.3 : 1,
                },
              ]}
            >
              <MaterialIcons name='phone' size={40} color={colors.light} />
            </View>
          </TouchableOpacity>
        )}

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
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '70%',
  },
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
    marginTop: 150,
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
})
