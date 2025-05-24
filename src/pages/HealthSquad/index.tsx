import React from "react";
import BackButton from "src/components/common/BackButton";
import { Container, Header, PageTitle } from "./styles";
import Divider from "src/components/common/Divider";
import WorkoutTimeline from "src/components/WorkoutTimeline";

const HealthSquad = () => {
    return (
        <Container>
            <Header>
                <BackButton/>
                <PageTitle>HealthSquad</PageTitle>
            </Header>
            <Divider/>
            <WorkoutTimeline/>            
        </Container>
    );
}

export default HealthSquad;