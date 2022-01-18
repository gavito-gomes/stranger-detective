import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

import CardsSelection from './screens/CardsSelection.js'
import Game from './screens/Game.js'
import Tip from './screens/Tip.js'
import Home from './screens/Home.js'
import PlayerSelection from './screens/PlayerSelection.js'
import Settings from './screens/Settings.js'
import Answer from './screens/Answer.js'

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: 'transparent' },
          headerShown: false,
        }}
      >
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Settings' component={Settings} />
        <Stack.Screen name='PlayerSelection' component={PlayerSelection} />
        <Stack.Screen name='CardsSelection' component={CardsSelection} />
        <Stack.Screen name='Game' component={Game} />
        <Stack.Screen name='Tip' component={Tip} />
        <Stack.Screen name='Answer' component={Answer} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
