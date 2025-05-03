import React from "react";
import { ActivityContainer, ActivityDateContainer, ActivityDateText, ActivityDurationCaloriesContainer, ActivityDurationCaloriesText, ActivityIcon, ActivityIconContainer, ActivityIconsContainer, ActivityText, ActivityTextContainer } from "../styles";
import DurationIcon from "@icons/hourglass-w.png";
import CaloriesIcon from "@icons/fire-w.png";
export interface ActivityDoneProps {
    id: string;
    name: string;
    duration: string;
    date: string;
    burnedCalories: string;
}

const ActivityDone = (props: Partial<ActivityDoneProps>) => {
    return (
        <ActivityContainer>
            <ActivityTextContainer>
                <ActivityText>{props.name}</ActivityText>
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
                        {props.duration}
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