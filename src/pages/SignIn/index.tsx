import React, { useState } from "react";
import {
  ButtonContainer,
  InputContainer,
  Input,
  LoginButton,
  SignInContainer,
  FormHeaderTitle,
  FormHeaderContainer,
} from "./styles";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { type PropsStack } from "../../routes";
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Title } from "src/components/common/DefaultButton/styles";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";

const SignIn = ({ goback }) => {
  const navigation = useNavigation<PropsStack>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSignIn, setShowSignIn] = useState(true)

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
    <SignInContainer>
      <ButtonContainer>
        <FormHeaderContainer>
          <TouchableOpacity
            onPress={() => {
              if(showSignIn) {
                goback();
              } else {
                setShowSignIn(true);
              }
            }}
            style={{...styles.button, ...styles.buttonLeft}}
          >
            <Entypo name="chevron-thin-left" size={25} color="white" />
          </TouchableOpacity>
          <FormHeaderTitle>{showSignIn ? 'Sign In' :  'Connect with us'}</FormHeaderTitle>
        </FormHeaderContainer>
        { !showSignIn &&
          (
            <KeyboardAvoidingView behavior="padding">
              <Animated.View 
            entering={SlideInLeft.springify().damping(16)}
            exiting={SlideOutRight.springify().damping(16)}
            >
            <InputContainer>
              <Input
                placeholder="Email Address"
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
              <TouchableOpacity
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
                style={styles.button}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={25}
                  color="#7265E3"
                />
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
              <Title>Login</Title>
            </LoginButton>
            </Animated.View>
            </KeyboardAvoidingView>
          )
        }
        { showSignIn &&
          (
            <Animated.View 
            entering={SlideInLeft.springify().damping(16)}
            style={{paddingTop: 10}}
            >
            <LoginButton style={{backgroundColor: "white"}} onPress={() => setShowSignIn(false)}>
              <MaterialCommunityIcons name="email-outline" size={30} color="black" />
              <Title style={{color: 'black', paddingLeft: 10}}>Continue with Email</Title>
            </LoginButton>
            <LoginButton style={{backgroundColor: "white", marginTop: 15}} onPress={() => setShowSignIn(false)}>
              <Ionicons name="logo-google" size={30} color="black" />
              <Title style={{color: 'black', paddingLeft: 10}}>Continue with Google</Title>
            </LoginButton>
         </Animated.View>
            
          )
        }
      </ButtonContainer>
    </SignInContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonLeft: {
    position: "absolute",
    left: 0,
  }
});

export default SignIn;
