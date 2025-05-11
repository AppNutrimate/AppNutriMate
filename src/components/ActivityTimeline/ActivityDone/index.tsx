import React from "react";
import { ActivityContainer, ActivityDateContainer, ActivityDateText, ActivityDurationCaloriesContainer, ActivityDurationCaloriesText, ActivityIcon, ActivityIconContainer, ActivityIconsContainer, ActivityText, ActivityTextContainer } from "../styles";
import DurationIcon from "@icons/hourglass-w.png";
import CaloriesIcon from "@icons/fire-w.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
export interface ActivityDoneProps {
    id: string;
    name: string;
    durationInMin: number;
    date: string;
    burnedCalories: string;
}

const ActivityDone = (props: Partial<ActivityDoneProps>) => {
    return (
        <ActivityContainer>
            <ActivityTextContainer>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <MaterialCommunityIcons name="soccer" size={20} color="#6161A9" />
                    <ActivityText>{props.name}</ActivityText>
                </View>
                <ActivityDateContainer>
                    <ActivityDateText>{props.date}</ActivityDateText>                    
                </ActivityDateContainer>
            </ActivityTextContainer>
            <ActivityIconsContainer>
                <ActivityDurationCaloriesContainer>
                    <ActivityIconContainer>
                        <ActivityIcon source={DurationIcon}/>
                    </ActivityIconContainer>
                    <ActivityDurationCaloriesText>
                        {props.durationInMin}min
                    </ActivityDurationCaloriesText>
                </ActivityDurationCaloriesContainer>
                <ActivityDurationCaloriesContainer>
                    <ActivityIconContainer>
                    <ActivityIcon source={CaloriesIcon}/>
                    </ActivityIconContainer>
                    <ActivityDurationCaloriesText>
                        {props.burnedCalories}kcal
                    </ActivityDurationCaloriesText>
                </ActivityDurationCaloriesContainer>
            </ActivityIconsContainer>    
        </ActivityContainer>
    )
}

export default ActivityDone;