import React, { useState } from "react";
import { Container, Title } from './style';
import BackButton from 'src/components/common/BackButton';
import DefaultButton from 'src/components/common/DefaultButton';
import ActivityCards from 'src/components/ActivityCards';
import DefaultAlert from "src/components/common/DefaultAlert";
import AddWorkoutModal from "../../components/AddWorkoutModal";
import RecentWorkouts from "src/components/RecentWorkouts";

const Performance = () => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isAddWorkoutModalOpen, setIsAddWorkoutModalOpen] = useState(false);

    const closeAlert = () => {
        setIsAlertOpen(false);
    };

    return (
        <Container>
            <BackButton />
            <Title>Dashboard</Title>
            <AddWorkoutModal
                isOpen={isAddWorkoutModalOpen}
                onClose={() => {
                    setIsAddWorkoutModalOpen(false);
                }} />
            <ActivityCards />
            <DefaultAlert
                isOpen={isAlertOpen}
                isSuccess={false}
                secondText={'Complete o cadastro'}
                onClose={closeAlert}
            />
            <DefaultButton
                backgroundColor={'#b8e903'}
                text={'+ Add Your Workout'}
                marginVertical={20}
                buttonHandle={() => {
                    setIsAddWorkoutModalOpen(true);
                }}
            />
            <RecentWorkouts />
        </Container>
    );
}

export default Performance;