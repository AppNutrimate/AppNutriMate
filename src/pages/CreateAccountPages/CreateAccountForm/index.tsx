import React, { useState } from 'react';
import {
ContainerButtons,
ErrorMessage,
ErrorMessageContainer,
FormInput,
FormLabel,
LArrowIcon,
MainContainer,
NextButton,
PrevButton,
RArrowIcon } from '../styles';
import BackButton from 'src/components/common/BackButton';
import ArrowBack from '@icons/arrow-back-p.png';
import { Alert, TextInput } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { format } from 'date-fns/format';
import { TextInputMask } from 'react-native-masked-text';
import userService from 'src/services/userService';
import { CommonActions, useNavigation } from "@react-navigation/native";
import { PropsStack } from 'src/routes';

type FormFields = 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword' | 'birthDate' | 'phone';

interface FormDataType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  phone: string;
}

const CreateAccountForm = () => {
    const navigation = useNavigation<PropsStack>();
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
        phone: '',
    });

    const formQuestions: { name: FormFields; label: string; placeholder: string }[] = [
        { name: 'firstName', label: 'Primeiro Nome', placeholder: 'Conta pra gente seu lindo nome...' },
        { name: 'lastName', label: 'Sobrenome', placeholder: 'Vamos completar sua identidade...' },
        { name: 'email', label: 'Email', placeholder: 'Juro nada de spam. Mas talvez...' },
        { name: 'password', label: 'Senha', placeholder: 'Shhh... é o nosso segredinho.' },
        { name: 'confirmPassword', label: 'Confirmar Senha', placeholder: 'Só pra ter certeza...' },
        { name: 'birthDate', label: 'Data de Nascimento', placeholder: 'Quando começou sua aventura?' },
        { name: 'phone', label: 'Telefone', placeholder: 'É só pro caso da saudade bater...' },
    ];

    const handleInputChange = (text: string) => {
        const fieldName = formQuestions[currentData].name;
        setFormData((prev) => ({ ...prev, [fieldName]: text }));
    };

    const handleDateChange = (date: string | number | Date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        setFormData({
            ...formData,
            birthDate: formattedDate,
        });
        setDatePickerVisibility(false);
    };

    const handleNext = async () => {
        if (!formData[formQuestions[currentData].name]) {
            setErrorMessage('Por favor, preencha o campo!');
            return;
        }

        if(formQuestions[currentData].name === 'email') {
            const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
            if (!emailRegex.test(formData.email)) {
                setErrorMessage('Por favor, insira um email válido!');
                return;
            }
        }

        if(formQuestions[currentData].name === 'password') {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
            if(formData.password.length < 6) {
                setErrorMessage('A senha deve ter pelo menos 6 caracteres!');
                return;
            }

            if (!passwordRegex.test(formData.password)) {
                setErrorMessage('Um caractere especial, maiúsculo e número!');
                return;
            }
        }

        if(formQuestions[currentData].name === 'confirmPassword') {
            if (formData.confirmPassword !== formData.password) {
                setErrorMessage('As senhas não coincidem!');
                return;
            }
        }

        if (currentData === formQuestions.length - 1) {
            handleRegister().then(() => {
                return handleLogin();           
            });
        } else {
            setErrorMessage('');
            setCurrentData(currentData + 1);
        }
    };

    const handleRegister = async () => {
        try {
            const res = await userService.register(
                formData.firstName.trim(),
                formData.lastName.trim(),
                formData.phone.trim(),
                formData.birthDate,
                formData.email.trim(),
                formData.password,
                'https://media.licdn.com/dms/image/v2/D4D03AQGsqhom3mWYsA/profile-displayphoto-shrink_800_800/B4DZTXVAOLHIAc-/0/1738779395394?e=1748476800&v=beta&t=xRaMX3WWA4jONqXOhXAxrmy-5L_UYtT8_-4exIFHdM4'
            );
            Alert.alert('Cadastro realizado com sucesso!')           
            setErrorMessage('');
            }
            catch (error) {
                if (error instanceof Error && (error as any).response?.status === 409) {
                    setErrorMessage('Email já cadastrado!');
                    Alert.alert('Email já cadastrado!');
                } else {
                    setErrorMessage('Erro ao cadastrar, tente novamente mais tarde.');
                    Alert.alert('Email já cadastrado!');
                }
            }
    }

    const handleLogin = async () => {
        try {
            await userService.login(formData.email, formData.password);
            Alert.alert('Login realizado com sucesso!');
            setErrorMessage("");
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: "TabRoutes" }],
                    })
                  );
            resetDataForm();
        } catch (error) {
            if (error instanceof Error && (error as any).response?.status === 401) {
                setErrorMessage('Email ou senha inválidos!');
                Alert.alert('Email ou senha inválidos!');
            } else {
                setErrorMessage('Erro ao realizar login, tente novamente mais tarde.');
                Alert.alert('Erro ao realizar login, tente novamente mais tarde.');
            }                
        }
    }

    const resetDataForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            birthDate: '',
            phone: '',
        });
    }

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
                        value={formData.birthDate ? format(new Date(formData.birthDate), 'dd/MM/yyyy') : ''}
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
            ) : formQuestions[currentData].name === 'phone' ? (
                <TextInputMask
                    type={'custom'}
                    options={{
                        mask: '+55 (99) 9 9999-9999',
                    }}
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
                    value={formData.phone}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={handleInputChange}
                />
            ):(
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
