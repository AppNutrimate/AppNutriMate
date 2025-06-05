import styled from "styled-components/native";

export const Container = styled.View`
  margin-bottom: -20px;
`

export const ModalTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkPurple};
  margin-bottom: 20px;
  align-self: flex-start;
`
export const FlexContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
export const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.darkPurple};
  margin-bottom: 10px;
`

export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  gap: 20px;
`

export const pickerSelectStyles = {
  inputIOS: {
    fontSize: 17,
    padding: 16,
    borderColor: 'gray',
    borderRadius: 10,
    color: 'black',
    backgroundColor: '#EDF1F7',
    marginBottom: 10,
    height: 50,
    width: 150,
  },
  inputAndroid: {
    fontSize: 17,
    padding: 16,
    borderColor: 'gray',
    borderRadius: 10,
    color: 'black',
    backgroundColor: '#EDF1F7',
    marginBottom: 10,
    height: 150,
  },
  placeholder: {
    color: '#A9A9A9',
    fontSize: 18,
  },
};

export const ArrowDown = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.purple};
  position: absolute;
  right: 5px;
  top: 15px;
`;

export const TitleInput = styled.TextInput`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.darkGray};
  border-color: gray;
  padding: 0 16px;
  border-radius: 10px;
  background-color: #EDF1F7;
  margin-bottom: 10px;
  width: 100%;
  height: 50px;
`;

export const MinutesInput = styled.TextInput`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.darkGray};
  border-color: gray;
  padding: 0 16px;
  border-radius: 10px;
  background-color: #EDF1F7;
  margin-bottom: 10px;
  width: 130px;
  height: 50px;
`;

export const AddButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.green};
  border-radius: 25px;
  padding: 10px;
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 5px;
`;

export const AddButtonText = styled.Text`
  font-size: 19px;
  font-weight: bold;
  color: white;
`;