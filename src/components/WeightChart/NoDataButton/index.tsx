import React from "react";
import { AddWeightButton, NoDataContainer, NoDataText, TextButton } from "../styles";

export const NoDataButton = () => {
  return (
      <NoDataContainer onPress={() => {console.log("Add weight button clicked")}}>
        <NoDataText>Clique aqui para adicionar seu peso!</NoDataText>
          <AddWeightButton >
            <TextButton>+</TextButton>
          </AddWeightButton>
      </NoDataContainer>
  );
}