import React, { useCallback, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Picker as RNPicker } from '@react-native-picker/picker'

import Text from '../components/text'
import Header from '../components/header'
import Button from '../components/button'
import { PLACES, PLAYERS, WEAPONS } from '../constants'
import { colors } from '../theme'
import PlayerSelectionCard from '../components/playerSelectionCard'
import { leaveMatch } from '../store'

const Picker = ({ options, selectedValue, onValueChange }) => {
  const ref = useRef()
  const selected = options.filter((el) => el.id === selectedValue)
  return (
    <View>
      <RNPicker
        ref={ref}
        style={{ opacity: 0 }}
        dropdownIconColor='transparent'
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {options.map((el, i) => (
          <RNPicker.Item key={i} label={el.name} value={el.id} />
        ))}
      </RNPicker>
      <TouchableOpacity onPress={() => ref.current.focus()}>
        <View style={styles.picker}>
          <Text>{selected[0]?.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default function Answer({ navigation }) {
  const dispatch = useDispatch()
  const [suspectPicker, setSuspectPicker] = useState(0)
  const [weaponPicker, setWeaponPicker] = useState(0)
  const [placePicker, setPlacePicker] = useState(0)

  const [playerSelected, setplayerSelected] = useState(undefined)
  const [playerSelectedConfirmation, setplayerSelectedConfirmation] =
    useState(undefined)
  const [answered, setanswered] = useState(false)
  const [result, setresult] = useState(false)

  const matchInfo = useSelector((state) => state.matchInfo)
  const players = useSelector((state) => state.players)

  // useFocusEffect(useCallback(setanswered(false)))

  const submitAnswer = () => {
    let { suspect, weapon, place } = matchInfo
    if (
      suspect === suspectPicker &&
      weapon === weaponPicker &&
      place === placePicker
    ) {
      setresult(true)
      console.log('ganhou')
    }
    setanswered(true)
    console.log('ganhou: ', result)
  }

  const playerLeaveMatch = () => {
    dispatch(leaveMatch({ id: playerSelected.id }))
    navigation.goBack()
  }

  return !playerSelectedConfirmation ? (
    <View style={styles.container}>
      <Header onReturn={() => navigation.goBack()}>SELECIONE O JOGADOR</Header>
      <View style={styles.body}>
        <Text>Selecione o jogador que fará a solução do caso:</Text>
        <View style={styles.content}>
          {players.map((el, i) => {
            return (
              <View style={styles.box} key={i}>
                <Pressable onPress={() => setplayerSelected(el)}>
                  <PlayerSelectionCard
                    inactive={playerSelected?.id !== el.id}
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
          style={{ marginTop: 30 }}
          onPress={() => setplayerSelectedConfirmation(true)}
        >
          CONFIRMAR
        </Button>
      </View>
    </View>
  ) : !answered ? (
    <View style={styles.container}>
      <Header onReturn={() => setplayerSelectedConfirmation(false)}>
        SOLUÇÃO DO CRIME
      </Header>
      <View style={styles.body}>
        <Text style={{ marginBottom: 30 }}>
          Escolha as opções que você acha que são a solução do crime:
        </Text>

        <View style={styles.field}>
          <Text>Assassino</Text>
          <Picker
            options={PLAYERS}
            selectedValue={suspectPicker}
            onValueChange={setSuspectPicker}
          />
        </View>
        <View style={styles.field}>
          <Text>Arma</Text>
          <Picker
            options={WEAPONS}
            selectedValue={weaponPicker}
            onValueChange={setWeaponPicker}
          />
        </View>
        <View style={styles.field}>
          <Text>Local</Text>
          <Picker
            options={PLACES}
            selectedValue={placePicker}
            onValueChange={setPlacePicker}
          />
        </View>

        <Button style={{ marginTop: 50 }} onPress={submitAnswer}>
          CONFIRMAR OPÇÕES
        </Button>
      </View>
    </View>
  ) : result ? (
    <View>
      <View style={[styles.body, { alignItems: 'center', paddingTop: 100 }]}>
        <Image
          source={playerSelected.thumb}
          resizeMode='contain'
          style={{ height: 150, width: 150 }}
        />
        <Text style={styles.title}>{playerSelected.name} venceu!</Text>
        <Text style={{ marginBottom: 100 }}>
          Você resolveu o caso com sucesso!
        </Text>
        <Button onPress={() => navigation.navigate('Home')}>
          VOLTAR AO INICIO
        </Button>
      </View>
    </View>
  ) : (
    <View>
      <Header onReturn={playerLeaveMatch}>VOLTAR AO JOGO</Header>
      <View style={[styles.body, { alignItems: 'center', paddingTop: 100 }]}>
        <Text style={{ fontSize: 40 }}>{'😞'}</Text>
        <Text style={styles.title}>Conclusão incorreta!</Text>
        <Text style={{ marginBottom: 100 }}>
          Você errou um ou mais elementos do caso.
        </Text>
        <Button onPress={playerLeaveMatch}>DEIXAR PARTIDA</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    padding: 20,
    marginTop: 20,
  },
  field: {
    marginVertical: 20,
  },
  picker: {
    // backgroundColor: '#ff4',
    padding: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.light,
  },
  title: {
    padding: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  content: {
    // backgroundColor: '#ff4',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    paddingVertical: 10,
  },
  box: {
    // backgroundColor: '#f44',
    // margin: 10,
    // width: 100,
    width: '45%',
    margin: 5,
  },
})
