import React from 'react'
import {
  type NativeStackNavigationProp,
  createNativeStackNavigator
} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Recipes from '../pages/Recipes'
import Diary from '../pages/Diary'
import RecipePage from '../pages/RecipePage'
import { type Recipe } from 'src/entitites/Recipe'
import CreateAccount from 'src/pages/CreateAccount'
import SetNamePage from 'src/pages/SetName'
import SetPhonePage from 'src/pages/SetPhone'
import SuccessPage from 'src/pages/Success'
import SetBirthDatePage from 'src/pages/SetBirthDate'
import SignIn from 'src/pages/SignIn'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type PropsNavigationStack = {
  Login: undefined
  CreateAccount: undefined
  SignIn: undefined
  Home: undefined
  Diary: undefined
  Recipes: undefined
  Profile: undefined
  RecipePage: { recipe: Recipe }
  SetNamePage: { userId: string }
  SetPhonePage: { userId: string }
  SetBirthDatePage: { userId: string }
  SuccessPage: undefined
}

const Stack = createNativeStackNavigator<PropsNavigationStack>()
export type PropsStack = NativeStackNavigationProp<PropsNavigationStack>

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SetNamePage" component={SetNamePage} />
        <Stack.Screen name="SetPhonePage" component={SetPhonePage} />
        <Stack.Screen name="SetBirthDatePage" component={SetBirthDatePage} />
        <Stack.Screen name="SuccessPage" component={SuccessPage} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Diary" component={Diary} />
        <Stack.Screen name="Recipes" component={Recipes} />
        <Stack.Screen name="RecipePage" component={RecipePage} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
