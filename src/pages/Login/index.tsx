import React, { useEffect, useState } from 'react'
import {
  ButtonContainer,
  IconContainer,
  LogoIcon,
  TypeIcon,
  CallIcon
} from './styles'
import DefaultButton from '../../components/common/DefaultButton'
import { useNavigation } from '@react-navigation/native'
import { type PropsStack } from '../../routes'
import NutrimateIcon from '@icons/nutrimate-icon.png'
import NutrimateIconName from '@icons/nutrimate-type.png'
import CallToActionIcon from '@icons/motto-text.png'
import Carousel from 'src/components/CarouselLogin'
import { View, Text, TextInput, Button, StyleSheet, BackHandler } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
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
  const [showForm, setShowForm] = useState(false);
  const buttonOpacity = useSharedValue(1); // Opacidade do botão
  const formTranslateY = useSharedValue(100); // Posição inicial do formulário (fora da tela)

  const handleLoginPress = () => {
    buttonOpacity.value = withTiming(0, { duration: 300 });
    formTranslateY.value = withTiming(0, { duration: 500 });
    setShowForm(true);
  };

  const handleBackPress = () => {
    if (showForm) {
      buttonOpacity.value = withTiming(1, { duration: 300 });
      formTranslateY.value = withTiming(100, { duration: 500 });
      setShowForm(false);
      return true; // Bloqueia o evento padrão de voltar
    }
    return false; // Permite o comportamento padrão
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, [showForm]);

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
  }));

  const formStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: formTranslateY.value }],
  }));

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ position: 'absolute', height: '100%', zIndex: 100, width:"100%" }}>
        
        <ButtonContainer style={{bottom: 0, position: "absolute"}}>
          {!showForm && (
          <Animated.View style={[buttonStyle, {height: 400, width: "100%", display: 'flex', alignItems: 'center', }]}>
            <TypeIcon source={NutrimateIconName} />
            <CallIcon source={CallToActionIcon} />
            <DefaultButton
              backgroundColor={'#777777'}
              text={'Create Account'}
              marginVertical={15}
              buttonHandle={() => {
                navigation.navigate('CreateAccount')
              }}
            />
            <DefaultButton
              backgroundColor={'#7265E3'}
              text={'Sign In'}
              marginVertical={8}
              buttonHandle={handleLoginPress}
            />
        </Animated.View>
      )}

      {showForm && (
        <Animated.View style={[formStyle, {width: "100%"}]}>
          <SignIn></SignIn>
        </Animated.View>
      )}
        </ButtonContainer>
      </View>
      <Carousel images={images}></Carousel>
    </View>
  );
}

export default Login