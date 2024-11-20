/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import { AddButtonIcon, Card, Container, MealPhoto, TitleCard } from './styles'

import { type ImageSourcePropType, TouchableOpacity, View } from 'react-native'

export interface MealCardProps {
  _id: string
  isLast: boolean
  height: number
  name: string
  icon: ImageSourcePropType
  onPressContainer?: () => void
  onLongPressContainer?: () => void
  onPressAdd?: () => void
}
import addIcon from '@icons/plusCircle.png'
const MealCard = (props: Partial<MealCardProps>) => {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={props.onPressContainer} onLongPress={props.onLongPressContainer}>
      <Container isLast={props.isLast}>
        <Card height={props.height}>
          <MealPhoto source={props.icon} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 1,
              paddingHorizontal: 20
            }}
          >
            <TitleCard>{props.name}</TitleCard>
            <TouchableOpacity activeOpacity={0.85} onPress={props.onPressAdd}>
              <AddButtonIcon source={addIcon} />
            </TouchableOpacity>
          </View>
        </Card>
      </Container>
    </TouchableOpacity>
  )
}

export default MealCard
