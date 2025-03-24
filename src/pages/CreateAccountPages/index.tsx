import React, { useState } from 'react';
import { StatusBar, Image, Touchable, TouchableOpacity } from 'react-native';
import BackButton from 'src/components/common/BackButton';
import { AnimatedSlideContainer, CallToAction, ContainerPhrases, MainContainer, Phrase, SkipAllButton, SkipAllText, SkipButton } from './styles';
import Onboarding1 from '@images/Petting.png'
import Onboarding2 from '@images/Plant.png'
import Onboarding3 from '@images/Rolling.png'
import { NavigationProp, useNavigation } from '@react-navigation/native';

const slideShow = [
    {
        phrase: 'Por aqui a comida é leve, o papo também.',
        callToAction: 'Bora começar?',
        image: Onboarding2,
        delay: 2000,
    },
    {
        phrase: 'Receitas, dicas e aquele empurrãozinho pra sua melhor versão!',
        callToAction: 'Eu quero!',
        image: Onboarding1,
        delay: 1000,
    },
    {
        phrase: 'Seu próximo prato pode ser o começo da sua melhor fase!',
        callToAction: 'Começar agora!',
        image: Onboarding3,
        delay: 2000,
    }, 
];

const CreateAccountPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigation = useNavigation() as NavigationProp<any>;
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('black');
    
    return (
        <MainContainer>
            <BackButton/>
            <AnimatedSlideContainer
                animation={'fadeIn'}
                duration={1000}
                delay={300}
                key={currentSlide}>
                <Image source={slideShow[currentSlide].image}/>
                <ContainerPhrases>
                    <Phrase>{slideShow[currentSlide].phrase}</Phrase>                    
                </ContainerPhrases>           
                <SkipButton
                    animation={'fadeIn'}
                    duration={1800}
                    delay={slideShow[currentSlide].delay}
                    onPress={() => {
                        if (currentSlide === slideShow.length - 1) {
                            navigation.navigate('CreateAccountForm');
                        } else {
                            setCurrentSlide(currentSlide + 1);
                        }
                    }}>
                    <CallToAction>
                        {slideShow[currentSlide].callToAction}
                    </CallToAction>
                </SkipButton>
                <SkipAllButton onPress={() => navigation.navigate('CreateAccountForm')}>
                    <SkipAllText>
                        Pular tudo
                    </SkipAllText>
                </SkipAllButton>              
            </AnimatedSlideContainer>
        </MainContainer>
    );
};

export default CreateAccountPage;