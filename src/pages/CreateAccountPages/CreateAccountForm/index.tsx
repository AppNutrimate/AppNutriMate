import React from 'react';
import { View, Text } from 'react-native';
import { MainContainer } from '../styles';
import BackButton from 'src/components/common/BackButton';

const CreateAccountForm = () => {
    return (
        <MainContainer>
            <BackButton></BackButton>
            <Text>Teste</Text>
        </MainContainer>
    );
};

export default CreateAccountForm;