import React from "react";
import { Modal, View } from "react-native";
import { AlertButton, AlertButtonText, AlertHeader, AlertSecondText, AlertText, ModalContent, ModalOverlay } from "./styles";
import LottieView from "lottie-react-native";
import SuccessGif from '../../../../assets/gifs/success.json';
import FailureGif from '../../../../assets/gifs/failure.json';
interface DefaultAlertProps {
  isOpen: boolean;
  isSuccess: boolean;
  secondText?: string;
  onClose: () => void;
}

const DefaultAlert = ({isOpen, isSuccess, secondText, onClose}:DefaultAlertProps) => {
  return (
    <Modal visible={isOpen} transparent animationType="fade">
        <ModalOverlay>
            <ModalContent>
                <AlertHeader style={{ backgroundColor: isSuccess ? '#b8e903' : '#7265E3'}} />
                <View style={{ paddingBottom: 20, alignItems: 'center' }}>
                    <LottieView
                        source={isSuccess
                            ? SuccessGif
                            : FailureGif}
                        autoPlay
                        loop
                        style={{ width: 120, height: 120 }}
                        />
                    <AlertText>{isSuccess ? "Oba! Deu tudo certo!" : "Eita... Algo não está certo."}</AlertText>
                    {secondText && (
                        <AlertSecondText>{secondText}</AlertSecondText>
                    )}
                    <AlertButton onPress={onClose}>
                        <AlertButtonText>OK</AlertButtonText>
                    </AlertButton>
                </View>
            </ModalContent>
        </ModalOverlay>
    </Modal>
  );
}
export default DefaultAlert;