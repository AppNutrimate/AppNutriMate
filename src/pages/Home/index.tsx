/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/common/NavBar'
import {
  Container,
  Greeting,
  GreetingUser,
  NutritionTipTitle,
  NutritionTip,
  NutritionTipContent,
  Welcome
} from './styles'
import NutritionTipList from '../../components/NutritionTipList'
import { TouchableOpacity, View, Image } from 'react-native'
import NotifyIcon from '@icons/notification.png'
import PerfilIcon from '@icons/perfil.png'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { PropsNavigationStack } from 'src/routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import userService from 'src/services/userService'
import AsyncStorage from '@react-native-async-storage/async-storage'
type HomeRouteProp = RouteProp<PropsNavigationStack, 'Home'>
type NavigationProp = NativeStackNavigationProp<PropsNavigationStack, 'Home'>
const Home = () => {
  const route = useRoute<HomeRouteProp>()
  const navigation = useNavigation<NavigationProp>()
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  const [userName, setUserName] = useState<string>('')
  const [userId, setUserId] = useState<string | null>(null)
  const [userPhoto, setUserPhoto] = useState<string | null>(null)
  useEffect(() => {
    const fetchUserIdAndDetails = async () => {
      try {
        let id = userId
        if (!id) {
          id = await AsyncStorage.getItem('userId')
        }
        if (id) {
          const user = await userService.getUserById(id)
          setUserName(user.firstName)
          setUserPhoto(user.profilePhoto)
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error)
      }
    }
    fetchUserIdAndDetails()
  }, [])

  return (
    <Container>
      <Greeting>
        <View>
          <Welcome>Welcome Back!</Welcome>
          <GreetingUser>Hi, {userName ? userName : 'Stranger'}</GreetingUser>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity>
            <Image source={NotifyIcon} style={{ width: 48, height: 48 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={userPhoto ? { uri: userPhoto } : PerfilIcon}
              style={{
                width: 80,
                height: 80,
                borderRadius: 100,
                borderColor: '#6161A9',
                borderWidth: 3
              }}
            />
          </TouchableOpacity>
        </View>
      </Greeting>
      <NutritionTip>
        <NutritionTipTitle>Nutrition Tips</NutritionTipTitle>
        <NutritionTipContent>
          Hey buddy! It’s a sunny day. Why don’t you get your shoes on and go
          running outside?
        </NutritionTipContent>
      </NutritionTip>
      <NutritionTipList />
      <NavBar />
    </Container>
  )
}

export default Home
