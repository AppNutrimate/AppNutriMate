import React, { useState } from "react";
import {
  ButtonContainer,
  InputContainer,
  Input,
  LoginButton,
  FormContainer,
  ConnectText,
  FormHeaderContainer,
} from "./styles";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { type PropsStack } from "../../routes";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import userService from "src/services/userService";
import { Title } from "src/components/common/DefaultButton/styles";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from '@expo/vector-icons/Ionicons';

const SignIn = ({ goback }) => {
  const navigation = useNavigation<PropsStack>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
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
        <ButtonContainer>
        <FormHeaderContainer>
          <TouchableOpacity onPress={() => {goback()}} style={styles.button}>
            <Entypo name="chevron-thin-left" size={25} color="white" />
          </TouchableOpacity>
          <ConnectText>Connect with us</ConnectText>
        </FormHeaderContainer>
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
              secureTextEntry={showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => {
              setShowPassword(!showPassword)
            }} style={styles.button}>
              <Ionicons name={ showPassword ? "eye-outline" : "eye-off-outline"  } size={25} color="#7265E3" />
            </TouchableOpacity>
            
          </InputContainer>
          <View style={{ paddingBottom: 10 }}>
            <TouchableOpacity
              style={{
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{ paddingVertical: 10, color: "#ffff", fontSize: 12 }}
              >
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

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignIn;
