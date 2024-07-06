import React, { type ReactNode } from 'react'
import {
  Card,
  Container,
  ContainerMacro,
  MacroIcon,
  MacroNumber,
  MealPhoto,
  TitleCard
} from './styles'
import CaloriesIcon from '@icons/fire-p.png'
import ProteinIcon from '@icons/muscle-p.png'
import TimeIcon from '@icons/time-p.png'
import { type ImageSourcePropType, View } from 'react-native'

export interface RecipeCardProps {
  _id: string
  isLast: boolean
  height: number
  children: ReactNode
  title: string
  calories: string
  proteins: string
  timePrepare: string
  image: ImageSourcePropType
}

const RecipeCard = (props: Partial<RecipeCardProps>) => {
  return (
    <Container isLast={props.isLast}>
      <Card height={props.height}>
        <MealPhoto source={props.image} />
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <TitleCard>{props.title}</TitleCard>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <ContainerMacro>
              <MacroIcon source={ProteinIcon} />
              <MacroNumber>{props.proteins}g</MacroNumber>
            </ContainerMacro>
            <ContainerMacro>
              <MacroIcon source={CaloriesIcon} />
              <MacroNumber>{props.calories}</MacroNumber>
            </ContainerMacro>
            <ContainerMacro>
              <MacroIcon source={TimeIcon} />
              <MacroNumber>{props.timePrepare}m</MacroNumber>
            </ContainerMacro>
          </View>
        </View>
      </Card>
    </Container>
  )
}

export default RecipeCard
