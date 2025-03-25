import React, { useState } from 'react';
import { ContainerButtons, ErrorMessage, ErrorMessageContainer, FormInput, FormLabel, LArrowIcon, MainContainer, NextButton, PrevButton, RArrowIcon } from '../styles';
import BackButton from 'src/components/common/BackButton';
import ArrowBack from '@icons/arrow-back-p.png';
import { TextInput } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { format } from 'date-fns/format';

type FormFields = 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword' | 'birthDate' | 'mainGoals';

interface FormDataType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  mainGoals: string;
}

const CreateAccountForm = () => {
    const [currentData, setCurrentData] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [formData, setFormData] = useState<FormDataType>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDate: '',
        mainGoals: '',
    });

    const formQuestions: { name: FormFields; label: string; placeholder: string }[] = [
        { name: 'firstName', label: 'Primeiro Nome', placeholder: 'Conta pra gente seu lindo nome...' },
        { name: 'lastName', label: 'Sobrenome', placeholder: 'Vamos completar sua identidade...' },
        { name: 'email', label: 'Email', placeholder: 'Juro nada de spam. Mas talvez...' },
        { name: 'password', label: 'Senha', placeholder: 'Shhh... é o nosso segredinho.' },
        { name: 'confirmPassword', label: 'Confirmar Senha', placeholder: 'Só pra ter certeza...' },
        { name: 'birthDate', label: 'Data de Nascimento', placeholder: 'Quando começou sua aventura?' },
        { name: 'mainGoals', label: 'Principais Objetivos', placeholder: 'O que te trouxe até aqui?' },
    ];

    const handleInputChange = (text: string) => {
        const fieldName = formQuestions[currentData].name;
        setFormData((prev) => ({ ...prev, [fieldName]: text }));
    };

    const handleDateChange = (date: Date) => {
        const formattedDate = format(date, 'dd/MM/yyyy'); 
        setFormData((prev) => ({ ...prev, birthDate: formattedDate }));
        setDatePickerVisibility(false);
    };

    const handleNext = () => {
        if (!formData[formQuestions[currentData].name]) {
            setErrorMessage('Por favor, preencha o campo!');
            return;
        }

        if(formQuestions[currentData].name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                setErrorMessage('Por favor, insira um email válido!');
                return;
            }
        }

        if (currentData === formQuestions.length - 1) {
            console.log('Cadastro finalizado:', formData);
        } else {
            console.log('Dados atuais:', formData);
            setErrorMessage('');
            setCurrentData(currentData + 1);
        }
    };

    return (
        <MainContainer>
            <BackButton />
            <FormLabel>{formQuestions[currentData].label}:</FormLabel>
            {formQuestions[currentData].name === 'birthDate' ? (
                <>
                    <TextInput
                        style={{
                            borderColor: isFocused ? '#7265E3' : '#ccc',
                            borderWidth: isFocused ? 2 : 1,
                            borderRadius: 7,
                            padding: 0,
                            paddingHorizontal: 16,
                            width: '100%',
                            height: 50,
                            fontSize: 18,
                            color: '#333',
                            marginBottom: 24,
                        }}
                        placeholder={formQuestions[currentData].placeholder}
                        value={formData.birthDate}
                        onFocus={() => {
                            setIsFocused(true);
                            setDatePickerVisibility(true);
                        }}
                        onBlur={() => setIsFocused(false)}
                    />
                    <DateTimePicker
                        isVisible={isDatePickerVisible}
                        mode="date"
                        date={new Date(formData.birthDate || Date.now())}
                        onConfirm={handleDateChange}
                        onCancel={() => setDatePickerVisibility(false)}
                    />
                </>
            ) : (
                <FormInput
                    isFocused={isFocused}
                    style={isFocused ? { borderColor: '#7265E3' } : {}}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={formQuestions[currentData].name === 'password' || formQuestions[currentData].name === 'confirmPassword'}
                    placeholder={formQuestions[currentData].placeholder}
                    value={formData[formQuestions[currentData].name]}
                    onChangeText={handleInputChange}
                />
            )}
            <ErrorMessageContainer>
                {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
            </ErrorMessageContainer>
            <ContainerButtons style={{ justifyContent: currentData === 0 ? 'flex-end' : 'space-between' }}>
                {currentData > 0 && (
                    <PrevButton onPress={() => setCurrentData(currentData - 1)}>
                    <LArrowIcon source={ArrowBack} />
                    </PrevButton>
                )}

                <NextButton onPress={handleNext}>
                    <RArrowIcon source={ArrowBack} />
                </NextButton>
                </ContainerButtons>

        </MainContainer>
    );
};

export default CreateAccountForm;
