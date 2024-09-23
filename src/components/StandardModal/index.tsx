/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Text,
  Pressable,
  type ModalProps,
  View,
} from "react-native";
import { Container } from "./styles";

interface StandardModalProps extends ModalProps {
  isOpen: boolean;
  withInput?: boolean;
  onClose: () => void;
}

const StandardModal = ({
  isOpen,
  withInput,
  children,
  onClose,
  ...rest
}: StandardModalProps) => {
  const content = withInput ? (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: "#18181b66",
      }}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <Container>
      <View
        style={{
          backgroundColor: "white",
          width: "90%",
          padding: 16,
          borderRadius: 25,
        }}
      >
        <Pressable onPress={onClose}>
          <Text style={{ textAlign: "right", marginEnd: 5 }}>Close</Text>
        </Pressable>
        {children}
      </View>
    </Container>
  );
  return (
    <Modal animationType="fade" transparent={true} visible={isOpen} {...rest}>
      {content}
    </Modal>
  );
};

export default StandardModal;
