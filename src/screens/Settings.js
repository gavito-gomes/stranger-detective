import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { updateTipInterval } from '../store'
import { useDispatch, useSelector } from 'react-redux'

import { colors } from '../theme'
import Header from '../components/header'
import Text from '../components/text'
import Button from '../components/button'

export default function Settings({ navigation }) {
  const dispatch = useDispatch()

  const onReturn = () => {
    navigation.goBack()
  }

  const initialInterval = useSelector(
    (state) => state.tipIntervalTime / 60 / 1000
  )
  const [interval, setinterval] = useState(initialInterval)

  const save = () => {
    dispatch(updateTipInterval({ interval: interval * 60 * 1000 }))
    Alert.alert('Sucesso', 'Alterações salvas')
  }

  return (
    <View style={{ flex: 1 }}>
      <Header onReturn={onReturn}>Configurações</Header>

      <View style={styles.body}>
        <Text style={styles.label}>Intervalo entre dicas</Text>
        <View style={styles.picker}>
          <Picker
            mode='dropdown'
            style={{ color: colors.light }}
            dropdownIconColor={colors.light}
            selectedValue={interval}
            onValueChange={(itemValue, i) => setinterval(itemValue)}
          >
            <Picker.Item label='Lento' value={2} />
            <Picker.Item label='Normal' value={1.5} />
            <Picker.Item label='Rapido' value={1} />
          </Picker>
        </View>

        <Button style={{ marginTop: 30 }} onPress={save}>
          Salvar alterações
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    // backgroundColor: '#f44',
    flex: 1,
    padding: 30,
  },
  label: {
    marginTop: 20,
    marginBottom: 15,
  },
  picker: {
    borderRadius: 5,
    borderColor: colors.light,
    borderWidth: 1,
    padding: 10,
  },
})
