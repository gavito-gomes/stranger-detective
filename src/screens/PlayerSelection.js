import React, { useState } from 'react'
import { StyleSheet, Pressable, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { setPlayers } from '../store'

import Header from '../components/header'
import PlayerSelectionCard from '../components/playerSelectionCard'
import { PLAYERS } from '../constants'
import Text from '../components/text'
import Button from '../components/button'

export default function PlayerSelection({ navigation }) {
  const dispatch = useDispatch()

  const [selectedPlayers, setselectedPlayers] = useState([])

  const selectPlayer = (id) => {
    let index = selectedPlayers.indexOf(id)
    if (index < 0) {
      setselectedPlayers([...selectedPlayers, id])
    } else {
      let newSelection = [...selectedPlayers]
      newSelection.splice(index, 1)
      setselectedPlayers(newSelection)
    }
  }

  const savePlayers = () => {
    let players = PLAYERS.filter((el) => selectedPlayers.includes(el.id))
    dispatch(setPlayers({ players }))
    navigation.navigate('CardsSelection')
  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        onReturn={() => {
          navigation.goBack()
        }}
      >
        Jogadores
      </Header>
      <Text style={styles.text}>Selecione no mínimo 3 jogadores:</Text>
      <View style={styles.content}>
        {PLAYERS.map((el, i) => {
          return (
            <View style={styles.box} key={i}>
              <Pressable onPress={() => selectPlayer(el.id)}>
                <PlayerSelectionCard
                  inactive={!selectedPlayers.includes(el.id)}
                  name={el.name}
                  thumb={el.thumb}
                  color={el.color}
                />
              </Pressable>
            </View>
          )
        })}
      </View>
      <Button
        disabled={selectedPlayers.length < 3}
        onPress={savePlayers}
        style={styles.button}
      >
        Continuar
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    // backgroundColor: '#ff4',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    paddingVertical: 10,
  },
  text: {
    margin: 20,
  },
  box: {
    // backgroundColor: '#f44',
    // margin: 10,
    // width: 100,
    width: '45%',
    margin: 5,
  },
  button: {
    width: 300,
    marginTop: 30,
  },
})
