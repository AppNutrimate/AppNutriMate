import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Dropdown, Option, OptionText } from '../styles';

interface DropdownButtonProps {
    options: { label: string; onPress: () => void }[];
    onClose: () => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ options, onClose }) => {
    return (
        <TouchableWithoutFeedback onPress={onClose}>
            <Dropdown>
                {options.map((option, index) => (
                    <Option
                        key={index}
                        onPress={() => {
                            option.onPress();
                            onClose();
                        }}
                    >
                        <OptionText>{option.label}</OptionText>
                    </Option>
                ))}
            </Dropdown>
        </TouchableWithoutFeedback>
    );
};

export default DropdownButton;

