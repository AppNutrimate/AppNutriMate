import React, { useCallback, useEffect, useState } from "react";
import { Container, Title } from './style';
import BackButton from 'src/components/common/BackButton';
import DefaultButton from 'src/components/common/DefaultButton';
import ActivityCards from 'src/components/ActivityCards';
import ActivityTimeline from 'src/components/ActivityTimeline';
import DefaultAlert from "src/components/common/DefaultAlert";

const Performance = () => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const closeAlert = () => {
        setIsAlertOpen(false);
    };

    return (
        <Container>
            <BackButton />
            <Title>Dashboard</Title>
            <ActivityCards/>
            <DefaultAlert
                isOpen={isAlertOpen}
                isSuccess={false}
                secondText={'Você ainda não tem atividades registradas!'}
                onClose={closeAlert}
            />
            <DefaultButton
                backgroundColor={'#b8e903'}
                text={'+ Add Your Workout'}
                marginVertical={20}
                buttonHandle={() => setIsAlertOpen(true)}
            />
            <ActivityTimeline/>
        </Container>
    );
}

export default Performance;
