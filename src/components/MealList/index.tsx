import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { type ImageSourcePropType } from 'react-native/Libraries/Image/Image'
import { Card, Container, TitleCard } from './styles'
import { AddButtonIcon } from '../MealCard/styles'
import addIcon from '@icons/plusCircle.png'

export interface MealListProps {
  _id: string
  isLast: boolean
  height: number
  name: string
  icon: ImageSourcePropType
  onPressAdd?: () => void
}
const MealList = (props: Partial<MealListProps>) => {
  return (
    <View>
      <Container isLast={props.isLast}>
        <Card height={props.height}>
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
            <TouchableOpacity activeOpacity={0.65} onPress={props.onPressAdd}>
              <AddButtonIcon source={addIcon} />
            </TouchableOpacity>
          </View>
        </Card>
      </Container>
    </View>
  )
}

export default MealList
