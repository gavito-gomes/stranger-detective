import React, { useCallback, useEffect, useState } from 'react'
import { Image, Modal, StyleSheet, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { unqueueTip, increaseTimer } from '../store'
import Button from '../components/button'
import Text from '../components/text'
import Logo from '../../assets/logo.png'
import { colors } from '../theme'
import { PLACES } from '../constants'
import { useInterval, usePausableTimeout } from '../hooks'
import Answer from './Answer'
import moment from 'moment'

export default function Game({ navigation }) {
  const dispatch = useDispatch()
  const queue = useSelector((state) => state.tipQueue)
  // const tipIntervalTime = useSelector((state) => state.tipIntervalTime)
  const tipIntervalTime = 5000
  const timerString = useSelector((state) => state.timer)

  const [paused, setpaused] = useState(false)
  const [showPauseModal, setshowPauseModal] = useState(false)
  const [showAnswerModal, setshowAnswerModal] = useState(false)

  const [position, setposition] = useState(0)
  const [images] = useState(
    PLACES.map((el) => el.image).sort(() => Math.random() - 0.5)
  )

  const timer = usePausableTimeout(() => {
    let tipParams = [...queue].shift()
    dispatch(unqueueTip())
    navigation.navigate('Tip', { tipParams })
  }, tipIntervalTime)

  useFocusEffect(
    useCallback(() => {
      timer.start()
      setpaused(false)
      return () => {
        timer.pause()
        setpaused(true)
      }
    }, [])
  )

  useInterval(
    () => {
      setposition((pos) => (pos + 1 >= images.length ? 0 : pos + 1))
    },
    paused ? null : 3000
  )

  useInterval(
    () => {
      dispatch(increaseTimer(1000))
    },
    paused ? null : 1000
  )

  const tooglePause = () => {
    if (paused) {
      setpaused(false)
      setshowPauseModal(false)
      timer.resume()
    } else {
      setpaused(true)
      setshowPauseModal(true)
      timer.pause()
    }
  }

  const goTo = (name) => navigation.navigate(name)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image resizeMode='contain' source={Logo} style={styles.logo} />
      </View>
      <View style={styles.body}>
        <Image
          resizeMode='cover'
          source={images[position]}
          style={styles.image}
        />
        <View style={styles.timer}>
          <Text style={styles.timerString}>
            {moment().startOf('day').add(timerString).format('mm:ss')}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.submit}>
          <Button style={styles.submitButton} onPress={() => goTo('Answer')}>
            Solucionar o caso
          </Button>
        </View>

        <Button style={{ paddingVertical: 10 }} onPress={tooglePause}>
          <MaterialIcons name='pause' size={30} color={colors.light} />
        </Button>
      </View>

      {showPauseModal && (
        <Modal transparent>
          <View style={styles.modalBackground}>
            <View style={styles.modal}>
              <Text style={styles.pauseTitle}>Jogo pausado</Text>
              <Button style={styles.pauseButton} onPress={tooglePause}>
                Continuar o jogo
              </Button>
              <Button style={styles.pauseButton} onPress={() => goTo('Home')}>
                Voltar ao início
              </Button>
            </View>
          </View>
        </Modal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 250,
    height: 100,
  },
  body: {
    flex: 1,
    backgroundColor: colors.dark,
    position: 'relative',
  },
  image: {
    height: '100%',
  },
  timer: {
    position: 'absolute',
    backgroundColor: '#00000088',
    alignItems: 'center',
    padding: 10,
    top: 0,
    width: '100%',
  },
  timerString: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 50,
  },
  submit: {
    flex: 1,
    // backgroundColor: '#f44',
    paddingRight: 10,
  },
  submitButton: {
    width: '100%',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '80%',
    padding: 20,
    paddingVertical: 40,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  pauseTitle: {
    color: colors.light,
    fontSize: 24,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 30,
  },
  pauseButton: {
    width: '70%',
    margin: 10,
  },
})
