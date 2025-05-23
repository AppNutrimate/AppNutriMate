import React, { useEffect, useState } from "react";
import BackButton from "src/components/common/BackButton";
import { Container, Header, PageTitle } from "./styles";
import Divider from "src/components/common/Divider";

const HealthSquad = () => {
    return (
        <Container>
            <Header>
                <BackButton/>
                <PageTitle>HealthSquad</PageTitle>
            </Header>
            <PageTitle style={{color: "red"}}>HealthSquad</PageTitle>
            <Divider/>
        </Container>
    );
}

export default HealthSquad;