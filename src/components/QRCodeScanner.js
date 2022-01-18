import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

import { colors } from '../theme'
import Text from '../components/text'
import Button from '../components/button'
import Header from '../components/header'
import { MaterialIcons } from '@expo/vector-icons'

export default function QRCodeScanner({
  onReturn,
  type,
  onSubmitScan = () => {},
}) {
  const [requesting, setrequesting] = useState(true)
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  const [data, setdata] = useState()
  const [feedback, setfeedback] = useState('')
  const [validScan, setvalidScan] = useState(false)

  const requestPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync()
    setHasPermission(status === 'granted')
    setrequesting(false)
  }

  useEffect(() => {
    requestPermission().catch((err) => console.log(err))
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(type, data)
    if (type != 256) return
    setScanned(true)
    setdata(data)
  }

  useEffect(() => {
    if (data) validateScan()
  }, [data])

  const validateScan = () => {
    let isValid = false
    try {
      let dataAsJson = JSON.parse(data)
      isValid = dataAsJson.product == 'st-dt'
    } catch (error) {
      console.log('JSON mal formatado!', error)
    }

    if (isValid) {
      setfeedback('Carta escaneada com sucesso.')
      setvalidScan(true)
    } else {
      setfeedback('Ocorreu algum erro. Tente novamente.')
      setvalidScan(false)
    }
  }

  return (
    <View style={styles.container}>
      <Header onReturn={onReturn}>Escanear carta</Header>
      {hasPermission === null ? (
        <View style={{ paddingTop: 100 }}>
          <ActivityIndicator size='large' color={colors.light} />
        </View>
      ) : !hasPermission ? (
        <View style={{ padding: 50, alignItems: 'center' }}>
          <Text>Sem permissão para acessar a câmera.</Text>
          <Button style={{ marginTop: 20 }} onPress={() => requestPermission()}>
            Permitir
          </Button>
        </View>
      ) : (
        !scanned && (
          <View style={styles.scannerWrapper}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.scanner}
            />
          </View>
        )
      )}
      {scanned && (
        <View style={styles.bottomActions}>
          <View style={styles.feedback}>
            {validScan && (
              <MaterialIcons name='check' size={30} color={colors.light} />
            )}
            <Text style={{ fontSize: 20, marginLeft: 15 }}>{feedback}</Text>
          </View>
          <Button
            onPress={() => setScanned(false)}
            style={{ backgroundColor: 'transparent' }}
          >
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <MaterialIcons name='refresh' size={20} color={colors.light} />
              <Text>Reescanear</Text>
            </View>
          </Button>
          <Button onPress={() => onSubmitScan(data)} disabled={!validScan}>
            Continuar
          </Button>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
    backgroundColor: colors.primary,
  },
  scannerWrapper: {
    position: 'relative',
  },
  scanner: {
    // backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: '2%',
    height: Dimensions.get('screen').height * 0.65,
    width: '96%',
  },
  bottomActions: {
    // backgroundColor: '#ff3',
    paddingTop: 100,
    alignItems: 'center',
    width: '100%',
  },
  feedback: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
  },
})
