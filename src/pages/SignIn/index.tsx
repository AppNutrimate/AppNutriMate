import React, { useState } from "react";
import {
  ButtonContainer,
  IconContainer,
  LogoIcon,
  TypeIcon,
  CallIcon,
  InputContainer,
  Input,
  LoginButton,
  FormContainer,
  ConnectText,
} from "./styles";
import DefaultButton from "../../components/common/DefaultButton";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { type PropsStack } from "../../routes";
import NutrimateIcon from "@icons/nutrimate-icon.png";
import NutrimateIconName from "@icons/nutrimate-type.png";
import CallToActionIcon from "@icons/motto-text.png";
import { View, Text, TouchableOpacity } from "react-native";
import userService from "src/services/userService";
import { Title } from "src/components/common/DefaultButton/styles";

const SignIn = () => {
  const navigation = useNavigation<PropsStack>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    try {
      const res = await userService.login(email, password);

      setErrorMessage("");

      navigation.dispatch(
        CommonActions.reset({
          index: 0, // Set index to 0
          routes: [{ name: "TabRoutes" }], // Replace with TabRoutes
        })
      );
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to login. Please try again.");
    }
  };
  return (
    <View>
      <FormContainer>
        <ConnectText>Connect with us</ConnectText>
        <ButtonContainer>
          <InputContainer>
            <Input
              placeholder="Email address"
              placeholderTextColor="#C0C0C1"
              value={email}
              onChangeText={setEmail}
            />
          </InputContainer>
          <InputContainer>
            <Input
              placeholder="Password"
              placeholderTextColor="#C0C0C1"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </InputContainer>
          <View style={{ paddingBottom: 10 }}>
            <TouchableOpacity style={{
              display: "flex",alignItems: 'flex-end',
            }}>
              <Text style={{paddingVertical: 10, color: "#ffff", fontSize: 12 }}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
          <LoginButton onPress={handleLogin}>
            <Title>Connect</Title>
          </LoginButton>
        </ButtonContainer>
      </FormContainer>
    </View>
  );
};

export default SignIn;
