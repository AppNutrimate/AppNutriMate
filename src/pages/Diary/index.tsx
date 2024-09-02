/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/common/NavBar'
import {
  ActionButton,
  ActionButtonText,
  ButtonContainer,
  CenterSubTitle,
  CenterTitle,
  Container,
  FormContainer,
  IndicatorContainer,
  ModalInput,
  ModalLabel,
  Section,
  SideSubTitle,
  SideTitle
} from './styles'
import DefaultTitle from '../../components/common/DefaultTitle'
import SearchBar from 'src/components/common/SearchBar'
import { FlatList, Text, View, Pressable } from 'react-native'
import MealCard from 'src/components/MealCard'
import mealService from 'src/services/mealService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { type Meal } from 'src/entitites/Meal'
import { useNavigation } from '@react-navigation/native'
import { type PropsStack } from 'src/routes'
import DefaultButton from 'src/components/common/DefaultButton'
import AddMealModal from 'src/components/StandardModal'

const Diary = () => {
  const [meals, setMeals] = useState<Meal[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [mealName, setMealName] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const navigation = useNavigation<PropsStack>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        let id = userId
        if (!id) {
          id = await AsyncStorage.getItem('userId')
          setUserId(id)
        }
        if (id) {
          const response = await mealService.getMealByUserId(id)
          setMeals(response ?? [])
        } else {
          console.error('User ID not found')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [userId])

  const renderItem = ({ item, index }: { item: Meal; index: number }) => (
    <MealCard
      isLast={index === meals.length - 1}
      height={100}
      name={item.name}
      icon={{ uri: item.icon }}
      onPressContainer={() => {
        navigation.navigate('DiaryMealRecipes', { meal: item })
      }}
      onPressAdd={() => {}}
    />
  )

  const handleAddMeal = async () => {
    try {
      if (!mealName) {
        console.error('Meal name is required')
        return
      }
      const iconFileName =
        mealName
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/ /g, '_') + '_icon.png'
      const createdMeal = await mealService.addMeal(
        // Somente para exemplo
        iconFileName,
        mealName,
        userId ?? ''
      )
      console.log('Meal created:', createdMeal)
      setMeals((prevMeals) => [...prevMeals, createdMeal])
      setMealName('')
      setModalOpen(false)
    } catch (error) {
      console.error('Error creating meal:', error)
    }
  }

  return (
    <Container>
      <DefaultTitle fontSize={20} title="Diary" />
      <SearchBar />
      <IndicatorContainer>
        <Section>
          <SideTitle>300</SideTitle>
          <SideSubTitle>Eaten</SideSubTitle>
        </Section>
        <Section>
          <CenterTitle>2300</CenterTitle>
          <CenterSubTitle>Total Calories</CenterSubTitle>
        </Section>
        <Section>
          <SideTitle>2000</SideTitle>
          <SideSubTitle>Remaining</SideSubTitle>
        </Section>
      </IndicatorContainer>
      <DefaultButton
        backgroundColor={'#6161A9'}
        text={'Add New Meal'}
        marginVertical={20}
        buttonHandle={() => {
          setModalOpen(true)
        }}
      />
      <AddMealModal isOpen={modalOpen}>
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            padding: 16,
            borderRadius: 25
          }}
        >
          <Pressable
            onPress={() => {
              setMealName('')
              setModalOpen(false)
            }}
          >
            <Text style={{ textAlign: 'right', marginEnd: 5 }}>Close</Text>
          </Pressable>
          <FormContainer>
            <ModalLabel>Meal Name:</ModalLabel>
            <ModalInput
              placeholder="Enter meal name..."
              value={mealName}
              onChangeText={(text) => setMealName(text)}
            />
          </FormContainer>
          <ButtonContainer>
            <ActionButton
              onPress={() => {
                handleAddMeal()
              }}
            >
              <ActionButtonText>Create Meal</ActionButtonText>
            </ActionButton>
          </ButtonContainer>
        </View>
      </AddMealModal>
      <FlatList
        data={meals}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <NavBar />
    </Container>
  )
}

export default Diary
