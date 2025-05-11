import React from "react";
import { ActivityContainer, ActivityDateContainer, ActivityDateText, ActivityDurationCaloriesContainer, ActivityDurationCaloriesText, ActivityIcon, ActivityIconContainer, ActivityIconsContainer, ActivityText, ActivityTextContainer, ActivityTitle } from "../styles";
import DurationIcon from "@icons/hourglass-w.png";
import CaloriesIcon from "@icons/fire-w.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Workout } from "src/entitites/Workout";
import { formatWorkoutDate } from "src/utils/formatDate";

export interface ActivityDoneProps extends Workout{ }

const ActivityDone = (props: Partial<ActivityDoneProps>) => {
    return (
        <ActivityContainer>
            <ActivityTitle>{props.name}</ActivityTitle>
            <View style={{flexDirection: "row", alignItems: "center"}}>
            <ActivityTextContainer>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <MaterialCommunityIcons name={props.sport?.icon as any} size={16} color="#6161A9" />
                    <ActivityText>{props.sport?.title}</ActivityText>
                </View>
                <ActivityDateContainer>
                    <ActivityDateText>{props.date ? formatWorkoutDate(props.date) : "Invalid date"}</ActivityDateText>                    
                </ActivityDateContainer>
            </ActivityTextContainer>
            <ActivityIconsContainer>
                <ActivityDurationCaloriesContainer>
                    <ActivityIconContainer>
                        <ActivityIcon source={DurationIcon}/>
                    </ActivityIconContainer>
                    <ActivityDurationCaloriesText>
                        {props.durationInMin && props.durationInMin > 1000 
                            ? props.durationInMin 
                            : `${props.durationInMin}min`}
                    </ActivityDurationCaloriesText>
                </ActivityDurationCaloriesContainer>
                <ActivityDurationCaloriesContainer>
                    <ActivityIconContainer>
                    <ActivityIcon source={CaloriesIcon}/>
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
    )
}

export default ActivityDone;