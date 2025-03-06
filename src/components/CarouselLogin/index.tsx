import React, { useEffect, useRef, useState } from 'react'

import { Container, ProductImage } from './styles'
import { Dimensions, FlatList, type ListRenderItem } from 'react-native'

export interface Image {
  url: string
}

export interface CarouselProps {
  images: {
    url: string
  }[]
}

const Carousel = ({ images }: CarouselProps) => {
  const renderItem: ListRenderItem<Image> = ({ item }) => {
    return <ProductImage source={{ uri: item.url }} />
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef(null)

  const autoRotate = () => {
    const nextIndex = (currentIndex + 1) % images.length

    if (nextIndex >= 0 && nextIndex < images.length) {
      const nextItemOffset = (Dimensions.get('window').width) * nextIndex
      flatListRef?.current?.scrollToOffset({
        animated: true,
        offset: nextItemOffset
      })
      setCurrentIndex(nextIndex)
    } else {
      setCurrentIndex(0)
    }
  }

  useEffect(() => {
    const interval = setInterval(autoRotate, 4000)

    return () => { clearInterval(interval) }
  }, [currentIndex])

  return (
    <>
      <Container style={{position: 'absolute', zIndex:0}}>
        <FlatList
          ref={flatListRef}
          data={images}
          keyExtractor={(item) => item.url}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled={true}
          decelerationRate={'normal'}
        />
      </Container>
    </>
  )
}

export default Carousel
