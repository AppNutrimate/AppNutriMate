import React, { useEffect, useState } from 'react'
import {
  Container,
  Greeting,
  GreetingUser,
  NutritionTipTitle,
  NutritionTip,
  NutritionTipContent,
  Welcome,
  ProfileImage
} from './styles'
import NutritionTipList from '../../components/NutritionTipList'
import { TouchableOpacity, View, Image } from 'react-native'
import NotifyIcon from '@icons/notification.png'
import PerfilIcon from '@icons/perfil.png'
import userService from 'src/services/userService'
import dailyTipsService from 'src/services/dailyTipsService'

const Home = () => {
  const [userName, setUserName] = useState<string>('')
  const [userPhoto, setUserPhoto] = useState<string | null>(null)
  const [dailyTip, setDailyTip] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserIdAndDetails = async () => {
      try {
        const user = await userService.getUserById()
        setUserName(user.firstName)
        setUserPhoto(user.profilePhoto)
        setDailyTip(await dailyTipsService.getDailyTip())
        
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
            <ProfileImage
              source={userPhoto ? { uri: userPhoto } : PerfilIcon}
            />
          </TouchableOpacity>
        </View>
      </Greeting>
      <NutritionTip>
        <NutritionTipTitle>Nutrition Tips</NutritionTipTitle>
        <NutritionTipContent>{dailyTip}</NutritionTipContent>
      </NutritionTip>
      <NutritionTipList />
    </Container>
  )
}

export default Home