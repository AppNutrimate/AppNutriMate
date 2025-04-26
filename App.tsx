import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { myTheme } from './src/styles'
import { ThemeProvider } from 'styled-components/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from 'src/pages/Login'
import CreateAccount from 'src/pages/CreateAccount'
import TabRoutes from 'src/routes/TabRoutes'
import CreateAccountPage from 'src/pages/CreateAccountPages'
import CreateAccountForm from 'src/pages/CreateAccountPages/CreateAccountForm'

const Stack = createNativeStackNavigator()
export default function App () {
  return (
    <>
      <StatusBar style="light" />
      <ThemeProvider theme={myTheme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CreateAccountPage" component={CreateAccountPage} />
            <Stack.Screen name="CreateAccountForm" component={CreateAccountForm} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="TabRoutes" component={TabRoutes} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </>
  )
}
