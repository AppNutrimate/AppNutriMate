import React, { act, useState } from "react";
import { ActivityContainer, ActivityDateContainer, ActivityDateText, ActivityDurationCaloriesContainer, ActivityDurationCaloriesText, ActivityIcon, ActivityIconContainer, ActivityIconsContainer, ActivityText, ActivityTextContainer, ActivityTitle, DropdownContainer, TitleAndDotsContainer } from "../styles";
import DurationIcon from "@icons/hourglass-w.png";
import CaloriesIcon from "@icons/fire-w.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { Workout } from "src/entitites/Workout";
import { formatWorkoutDate } from "src/utils/formatDate";
import DropdownButton from "../DropdownButton";
import workoutService from "src/services/workoutService";
import DefaultAlert from "src/components/common/DefaultAlert";

export interface ActivityDoneProps extends Workout { }

const ActivityDone = (props: Partial<ActivityDoneProps>) => {
    const [buttonVisible, setButtonVisible] = useState(false);
    const [alertProps, setAlertProps] = useState(
        {
            isOpen: false,
            isSuccess: false,
            secondText: "",
            onClose: () => setAlertProps({ ...alertProps, isOpen: false }),
        }
    );

    const handleDeleteWorkout = async () => {
        try {
            if (props.id) {
                await workoutService.deleteWorkout(props.id);
                setAlertProps({
                    isOpen: true,
                    isSuccess: true,
                    secondText: "Treino deletado com sucesso",
                    onClose: () => {
                        setAlertProps({ ...alertProps, isOpen: false });
                    },
                });
            }
        } catch (error) {
            console.error("Error deleting workout:", error);
            setAlertProps({
                isOpen: true,
                isSuccess: false,
                secondText: "Não foi possível deletar o treino",
                onClose: () => setAlertProps({ ...alertProps, isOpen: false }),
            });
            setButtonVisible(false);
        }
    }

    return (
        <TouchableOpacity onPress={() => setButtonVisible(false)} activeOpacity={1}>
            <DefaultAlert
                isOpen={alertProps.isOpen}
                isSuccess={alertProps.isSuccess}
                secondText={alertProps.secondText}
                onClose={alertProps.onClose}
            />
            <ActivityContainer>
                <TitleAndDotsContainer>
                    <ActivityTitle>{props.name}</ActivityTitle>
                    <TouchableOpacity onPress={() => setButtonVisible(!buttonVisible)}>
                        <MaterialCommunityIcons name="dots-vertical" size={24} color="#4a2382" />
                    </TouchableOpacity>
                    {buttonVisible && (
                        <DropdownContainer>
                            <DropdownButton
                                options={[
                                    { label: "Delete", onPress: handleDeleteWorkout },
                                ]}
                                onClose={() => setButtonVisible(false)}
                            />
                        </DropdownContainer>
                    )}
                </TitleAndDotsContainer>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <ActivityTextContainer>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialCommunityIcons name={props.sport?.icon as any} size={16} color="#4a2382" />
                            <ActivityText>{props.sport?.title}</ActivityText>
                        </View>
                        <ActivityDateContainer>
                            <ActivityDateText>{props.date ? formatWorkoutDate(props.date) : "Invalid date"}</ActivityDateText>
                        </ActivityDateContainer>
                    </ActivityTextContainer>
                    <ActivityIconsContainer>
                        <ActivityDurationCaloriesContainer>
                            <ActivityIconContainer>
                                <ActivityIcon source={DurationIcon} />
                            </ActivityIconContainer>
                            <ActivityDurationCaloriesText>
                                {props.durationInMin && props.durationInMin > 1000
                                    ? props.durationInMin
                                    : `${props.durationInMin}min`}
                            </ActivityDurationCaloriesText>
                        </ActivityDurationCaloriesContainer>
                        <ActivityDurationCaloriesContainer>
                            <ActivityIconContainer>
                                <ActivityIcon source={CaloriesIcon} />
                            </ActivityIconContainer>
                            <ActivityDurationCaloriesText>
                                {props.caloriesBurned && props.caloriesBurned > 9999
                                    ? props.caloriesBurned
                                    : `${props.caloriesBurned}kcal`}
                            </ActivityDurationCaloriesText>
                        </ActivityDurationCaloriesContainer>
                    </ActivityIconsContainer>
                </View>
            </ActivityContainer>
        </TouchableOpacity>
    )
}

export default ActivityDone;