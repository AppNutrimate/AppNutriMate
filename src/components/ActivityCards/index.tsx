import React from "react";
import { CircleContainer, Container, FlexContainer, HistoryIcon, IconCircle, ChartIcon, MainContainer, Title, BackgroundImage } from "./styles";
import CompassIcon from "@icons/compass-w.png";
import KettleIcon from "@icons/kettlebell-w.png";
import CalendarIcon from "@icons/calendar-w.png";
import TrackIcon from "@icons/chart-w.png";
import PurpleTextureButton from "@images/purple-dots-texture.png"
import GreenTextureButton from "@images/green-dots-texture.png"

const ActivityCards = () => {
    return(
        <Container>
            <FlexContainer>
                <MainContainer style={{ flexDirection: "row", backgroundColor: "#b8e903", height: 70 }}>
                    <BackgroundImage source={GreenTextureButton}/>
                    <HistoryIcon source={CalendarIcon}/>
                    <Title>History</Title>
                </MainContainer>            
                <MainContainer style={{ height: 190 }}>
                    <ChartIcon source={TrackIcon} />
                    <Title>Track Weight</Title>
                </MainContainer>
            </FlexContainer>
            <FlexContainer>
                <MainContainer>
                    <BackgroundImage source={PurpleTextureButton}/>
                    <CircleContainer>
                        <IconCircle source={CompassIcon}/>
                    </CircleContainer>
                    <Title>New Adventures</Title>
                </MainContainer>            
                <MainContainer>
                    <BackgroundImage source={PurpleTextureButton}/>
                    <CircleContainer>
                        <IconCircle source={KettleIcon}/>
                    </CircleContainer>
                    <Title>HealthSquad™</Title>
                </MainContainer>
            </FlexContainer>
        </Container>
    )
}

export default ActivityCards;