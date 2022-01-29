import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av'
import { useInterval } from '../../hooks'
import Text from '../text'
import { colors } from '../../theme'
import Anonimo from '../../../assets/thumbs/anonimo.jpg'
import { MaterialIcons } from '@expo/vector-icons'
import moment from 'moment'
import { getTipAudio } from '../../audioTipManager'

export default function Call({ tipParams, refuse }) {
  const states = {
    START: 0,
    RINGTONE_PLAYING: 1,
    ACCEPTED: 2,
    TIP_PLAYING: 3,
    TIP_OVER: 4,
    REPLAY: 5,
    TIP_REPLAYING: 6,
  }

  const { player, tip } = tipParams
  const [state, setstate] = useState(states.START)
  const [timePassed, settimePassed] = useState(0)

  const [ringtone, setringtone] = useState()
  const [audioTip, setaudioTip] = useState()

  useEffect(() => {
    // console.log('state: ', state)
    switch (state) {
      case states.START: {
        setstate(states.RINGTONE_PLAYING)
        playRingtone()
        break
      }
      case states.RINGTONE_PLAYING: {
        break
      }
      case states.ACCEPTED: {
        // console.log('Unloading Ringtone')
        ringtone?.unloadAsync()

        setstate(states.TIP_PLAYING)
        playAudioTip()
        break
      }
      case states.TIP_PLAYING: {
        break
      }
      case states.TIP_OVER: {
        settimePassed(0)

        // console.log('Unloading tip')
        audioTip?.unloadAsync()
        break
      }

      case states.REPLAY: {
        setstate(states.TIP_REPLAYING)
        playAudioTip()
        break
      }
      default:
        break
    }
  }, [state])

  const unmount = async () => {
    // console.log('when does it happens')
    Audio.setAudioModeAsync({
      playThroughEarpieceAndroid: false,
    })
    try {
      ringtone?.stopAsync()
      ringtone?.unloadAsync()

      audioTip?.unloadAsync()
    } catch (error) {
      console.log(error)
    }
  }

  useInterval(() => {
    if (state == states.TIP_PLAYING) settimePassed((time) => time + 1000)
  }, 1000)

  const playRingtone = async () => {
    // console.log('Loading Ringtone')
    const { sound } = await Audio.Sound.createAsync(
      require('../../../assets/audio/ringtone.mp3'),
      {
        isLooping: true,
      }
    )
    setringtone(sound)

    // console.log('Playing Ringtone')
    await sound.playAsync()
  }

  const playAudioTip = async () => {
    // console.log('Loading audio tip')
    try {
      // console.log('Setting ear mode')
      await Audio.setAudioModeAsync({
        playThroughEarpieceAndroid: true,
      })
      const { sound } = await Audio.Sound.createAsync(
        getTipAudio(tip.audioName)
      )
      // sound.setVolumeAsync()
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setstate(states.TIP_OVER)
        }
      })

      setaudioTip(sound)
      // console.log('Playing audio tip')
      sound.playAsync()
    } catch (error) {
      // console.log('err', error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headline}>
        <Text style={styles.title}>Chamada de voz</Text>
      </View>

      {state == states.TIP_PLAYING && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.title}>
            {moment()
              .startOf('day')
              .add(timePassed, 'milliseconds')
              .format('mm:ss')}
          </Text>
        </View>
      )}

      <View style={[styles.characters]}>
        <View style={styles.character}>
          <Image source={Anonimo} style={styles.thumb} />
          <Text style={styles.name}>Anônimo</Text>
        </View>
        {state == states.RINGTONE_PLAYING && (
          <>
            <View style={{ flexDirection: 'row', marginHorizontal: 30 }}>
              <MaterialIcons
                name='double-arrow'
                size={30}
                color={colors.light}
              />
            </View>
            <View style={styles.character}>
              <Image source={player.thumb} style={styles.thumb} />
              <Text style={styles.name}>{player.name}</Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.action}>
        {/* accetp button */}
        {state == states.RINGTONE_PLAYING && (
          <TouchableOpacity onPress={() => setstate(states.ACCEPTED)}>
            <View
              style={{
                ...styles.roundButton,
                backgroundColor: '#5BD55F',
              }}
            >
              <MaterialIcons name='phone' size={40} color={colors.light} />
            </View>
          </TouchableOpacity>
        )}
        {/* replay button */}
        {state == states.TIP_OVER && (
          <TouchableOpacity onPress={() => setstate(states.REPLAY)}>
            <View
              style={{
                ...styles.roundButton,
                backgroundColor: '#5BD55F',
              }}
            >
              <MaterialIcons name='replay' size={40} color={colors.light} />
            </View>
          </TouchableOpacity>
        )}

        {/* refuse button */}
        <TouchableOpacity
          onPress={() => {
            unmount()
            refuse()
          }}
          disabled={state == states.TIP_PLAYING}
        >
          <View
            style={{
              ...styles.roundButton,
              backgroundColor: state == states.TIP_PLAYING ? '#888' : '#EF5353',
            }}
          >
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
    marginTop: 80,
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
