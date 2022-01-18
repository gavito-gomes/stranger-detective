import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Modal } from 'react-native'

import Text from '../components/text'
import Header from '../components/header'
import Button from '../components/button'
import Picker from '../components/cardPicker'
import { PLACES, PLAYERS, WEAPONS } from '../constants'
import QRCodeScanner from '../components/QRCodeScanner'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayers, setMatchInfo, setTipQueue } from '../store'
import { generateTipQueue } from '../tips'

export default function CardSelection({ navigation }) {
  const dispatch = useDispatch()
  let players = useSelector((state) => state.players)

  const [suspect, setsuspect] = useState(undefined)
  const [weapon, setweapon] = useState(undefined)
  const [place, setplace] = useState(undefined)
  const [scannerActive, setscannerActive] = useState(false)

  const ready =
    Number.isInteger(suspect) &&
    suspect >= 0 &&
    Number.isInteger(weapon) &&
    weapon >= 0 &&
    Number.isInteger(place) &&
    place >= 0

  // useEffect(() => {
  //   console.log('suspect', suspect, 'weapon', weapon, 'place', place)
  // }, [ready])

  const getoptions = (array) => {
    return [
      { name: '', value: -1 },
      ...array.map((el) => ({
        name: el.name,
        value: el.id,
      })),
    ]
  }

  const suspectOptions = getoptions(PLAYERS)
  const weaponOptions = getoptions(WEAPONS)
  const placeOptions = getoptions(PLACES)

  const onSubmitScan = (data) => {
    const { type, id } = JSON.parse(data)
    console.log('type', data.type, 'id', data.id)
    switch (type) {
      case 'suspect':
        setsuspect(id)
        break
      case 'weapon':
        setweapon(id)
        break
      case 'place':
        setplace(id)
      default:
        break
    }
    setscannerActive(false)
  }

  const startMatch = () => {
    // set the match info
    dispatch(
      setMatchInfo({
        matchInfo: {
          suspect,
          weapon,
          place,
        },
      })
    )

    // set the players tips
    let newPlayers = players.map((el) => {
      return {
        ...el,
        tipQueue: generateTipQueue(suspect, weapon, place),
      }
    })
    dispatch(setPlayers({ players: newPlayers }))

    // set the order of the tips
    let tipQueue = []
    for (let i = 0; i < 24; i++) {
      let stage = newPlayers
        .map((el) => {
          let { tipQueue, ...player } = el
          return {
            player,
            tip: tipQueue ? tipQueue[i] : undefined,
          }
        })
        .sort(() => Math.random() - 0.5)
      tipQueue = [...tipQueue, ...stage]
    }
    dispatch(setTipQueue({ tipQueue }))

    navigation.navigate('Game')
  }

  return (
    <View>
      <Header
        onReturn={() => {
          navigation.goBack()
        }}
      >
        Cartas do crime
      </Header>
      <View style={styles.body}>
        <Text>
          {
            'Selecione as cartas do assassino, da arma e do local que foram escolhidas no jogo.\n\nUse o leitor de QRCode ou peça para alguém que não está jogando selecionar as opções.\n\n'
          }
        </Text>

        <Button onPress={() => setscannerActive(true)}>
          <Text>Escanear qrcode</Text>
        </Button>

        <View style={styles.selectionArea}>
          <Picker
            options={suspectOptions}
            label='Assassino'
            selectedValue={suspect}
            onValueChange={(value) => setsuspect(value)}
          />
          <Picker
            options={weaponOptions}
            label='Arma'
            selectedValue={weapon}
            onValueChange={(value) => setweapon(value)}
          />
          <Picker
            options={placeOptions}
            label='Local'
            selectedValue={place}
            onValueChange={(value) => setplace(value)}
          />
        </View>
      </View>

      <View style={styles.conclusion}>
        {!!ready && <Text>Tudo pronto!</Text>}
        <Button
          disabled={!ready}
          style={{ marginTop: 15 }}
          onPress={startMatch}
        >
          Começar a partida
        </Button>
      </View>

      {scannerActive && (
        <Modal transparent>
          <QRCodeScanner
            onReturn={() => {
              setscannerActive(false)
            }}
            onSubmitScan={onSubmitScan}
          />
        </Modal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    padding: 30,
  },
  selectionArea: {
    marginTop: 30,
    marginBottom: 100,
  },
  conclusion: {
    alignItems: 'center',
  },
})
