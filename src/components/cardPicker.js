import React, { useRef, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { MaterialIcons } from '@expo/vector-icons'

import { colors } from '../theme'
import Text from '../components/text'

export default function CardPicker({
  options,
  label,
  selectedValue,
  onValueChange,
}) {
  const pickerRef = useRef()
  const [visible, setvisible] = useState(false)

  const select = () => {
    pickerRef.current.focus()
  }

  const selected = options.filter((el) => el.value === selectedValue)

  return (
    <View style={styles.row}>
      <View style={styles.picker}>
        <View style={styles.checkBox}>
          {selected[0]?.value >= 0 && (
            <MaterialIcons name='check' size={30} color={colors.light} />
          )}
        </View>
        <Pressable onPress={select} style={styles.label}>
          <Text>{visible ? selected[0]?.name : label}</Text>
        </Pressable>
        <Picker
          style={{ opacity: 0 }}
          dropdownIconColor='transparent'
          ref={pickerRef}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
        >
          {options.map((el, i) => (
            <Picker.Item key={i} label={el.name} value={el.value} />
          ))}
        </Picker>
        <Pressable
          onPressIn={() => setvisible(true)}
          onPressOut={() => setvisible(false)}
          style={styles.showValue}
        >
          <MaterialIcons
            name={`visibility${visible ? '' : '-off'}`}
            size={30}
            color={colors.light}
          />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    // backgroundColor: '#ff4',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.light,
  },
  checkBox: {
    borderRightWidth: 1,
    borderColor: colors.light,
    borderRadius: 5,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    backgroundColor: 'transparent',
    // backgroundColor: '#f44',
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  showValue: {
    justifyContent: 'center',
    padding: 10,
  },
})
