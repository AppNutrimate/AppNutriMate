import React, { useEffect, useState } from 'react'
import NavBar from '../../components/common/NavBar'
import { Container, ContainerTabRecipes, TabButton, TabButtonText, TabRecipes } from './styles'
import DefaultTitle from '../../components/common/DefaultTitle'
import SearchBar from 'src/components/common/SearchBar'
import RecipeCard from 'src/components/RecipeCard'
import { FlatList, Text, View } from 'react-native'
import { type Recipe } from 'src/entitites/Recipe'
import recipeService from 'src/services/recipeService'
import { useNavigation } from '@react-navigation/native'
import { type PropsStack } from 'src/routes'

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[] | []>([])
  const navigation = useNavigation<PropsStack>()

  const handleNavigate = (recipe: Recipe) => {
    navigation.navigate('RecipePage', { recipe })
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await recipeService.getRecipes()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setRecipes(response?.data ?? [])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData()
  }, [])

  const renderItem = ({ item }: { item: Recipe }) => (
    <RecipeCard
      isLast={false}
      height={100}
      title={item.name}
      calories={item.calories}
      proteins={item.proteins}
      timePrepare={item.timePrepare}
      image={{ uri: item.picture }}
      onPress={() => {
        handleNavigate(item)
      }}
    />
  )

  const [tabActive, setTabActive] = useState<string>('recipes')

  function isActive (name: string) {
    return tabActive === name
  }

  return (
    <Container>
      <DefaultTitle fontSize={20} title="Recipes" />
      <SearchBar />
      <ContainerTabRecipes>
        <TabRecipes>
          <TabButton active={isActive('recipes')} onPress={() => { setTabActive('recipes') }}>
            <TabButtonText active={isActive('recipes')}>Recipes</TabButtonText>
          </TabButton>
          <TabButton active={isActive('myrecipes')} onPress={() => { setTabActive('myrecipes') }}>
            <TabButtonText active={isActive('myrecipes')}>My recipes</TabButtonText>
          </TabButton>
        </TabRecipes>
      </ContainerTabRecipes>
      {
        isActive('recipes')
          ? <FlatList
        data={recipes}
        keyExtractor={(item: Recipe) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      />
          : <View><Text>Nenhuma receita.</Text></View>

      }
      <NavBar />
    </Container>
  )
}

export default Recipes
