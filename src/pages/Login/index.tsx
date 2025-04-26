import React, { useEffect, useState } from 'react'
import {
  ButtonContainer,
  TypeIcon,
  CallIcon,
  MainContainer,
  LogoContainer,
  SignInContainer,
  LogInContainer
} from './styles'
import DefaultButton from '../../components/common/DefaultButton'
import { useNavigation } from '@react-navigation/native'
import { type PropsStack } from '../../routes'
import NutrimateIconName from '@icons/nutrimate-type.png'
import NutrimateLogoName  from '@icons/nutrimate-logo-name.png'
import NutrimateLogo from '@icons/nutrimate-logo-p.png'
import CallToActionIcon from '@icons/motto-text.png'
import Carousel from 'src/components/CarouselLogin'
import { BackHandler, Image } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import SignIn from '../SignIn'


const images = [
  {
    url: 'https://s2.glbimg.com/aJODiXk4Vk-r03RddGouHjPgdAg=/smart/e.glbimg.com/og/ed/f/original/2022/04/13/jason-briscoe-grdjp16cpk8-unsplash.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1654922207993-2952fec328ae?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    url: 'https://images.unsplash.com/photo-1610558269197-70cfbad7c556?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
]

const Login = () => {
  const navigation = useNavigation<PropsStack>()
  const [showLoginForm, setshowLoginForm] = useState<boolean | null>(false);


  const handleLoginPress = () => {
    setshowLoginForm(true);
  };

  const handleBackPress = () => {
    if (showLoginForm) {
      setshowLoginForm(false);
      return true;
    }
    
    return false;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, [showLoginForm]);

  return (
    <MainContainer>
        <LogoContainer>
          <Image source={ showLoginForm ? NutrimateLogoName : NutrimateLogo}/>
        </LogoContainer>
        
        <ButtonContainer>
          {!showLoginForm && (
          <SignInContainer
          entering={SlideInDown.springify().damping(16).delay(100)}
          exiting={SlideOutDown.duration(500)}>
            <TypeIcon source={NutrimateIconName} />
            <CallIcon source={CallToActionIcon} />
            <DefaultButton
              backgroundColor={'#777777'}
              text={'Create Account'}
              marginVertical={15}
              buttonHandle={() => {
                navigation.navigate('CreateAccountPage')
              }}
            />
            <DefaultButton
              backgroundColor={'#7265E3'}
              text={'Sign In'}
              marginVertical={8}
              buttonHandle={handleLoginPress}
            />
        </SignInContainer>
      )}

      {showLoginForm && (
        <LogInContainer
         entering={SlideInDown.springify().damping(16)}
         exiting={SlideOutDown.duration(500)}
         >
          <SignIn goback={handleBackPress}></SignIn>
        </LogInContainer>
      )}
        </ButtonContainer>
      <Carousel images={images}></Carousel>
    </MainContainer>
  );
}

export default Login