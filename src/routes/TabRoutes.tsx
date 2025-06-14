import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "src/pages/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Diary from "src/pages/Diary";
import DiaryMealRecipes from "src/pages/DiaryMealRecipes";
import Profile from "src/pages/Profile";
import Performance from "src/pages/Performance";
import EditProfile from "src/pages/Profile/EditProfile";
import RecipePage from "src/pages/RecipePage";
import Recipes from "src/pages/Recipes";
import SetBirthDatePage from "src/pages/SetBirthDate";
import SetNamePage from "src/pages/SetName";
import SetPhonePage from "src/pages/SetPhone";
import SuccessPage from "src/pages/Success";
import { Platform } from "react-native";
import HomeIcon from "@icons/home-icon-p.png";
import HomeIconSolid from "@icons/home-icon-solid.png";
import DiaryIcon from "@icons/diary-icon-p.png";
import DiaryIconSolid from "@icons/diary-icon-solid.png";
import RecipesIcon from "@icons/recipes-icon-p.png";
import RecipesIconSolid from "@icons/recipes-icon-solid.png";
import ProfileIcon from "@icons/profile-icon-p.png";
import ProfileIconSolid from "@icons/profile-icon-solid.png";
import ExamsIcon from "@icons/exams-icon-p.png";
import ExamsIconSolid from "@icons/exams-icon-solid.png";
import { ImageSourcePropType, View, Image } from "react-native";
import StatusPage from "src/pages/StatusPage";
import HealthSquad from "src/pages/HealthSquad";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const DiaryStack = createNativeStackNavigator();
const PerformanceStack = createNativeStackNavigator();
const RecipeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
}

function DiaryStackScreen() {
  return (
    <DiaryStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <DiaryStack.Screen name="Diary" component={Diary} />
      <DiaryStack.Screen name="DiaryMealRecipes" component={DiaryMealRecipes} />
    </DiaryStack.Navigator>
  );
}

function PerformanceStackScreen() {
  return (
    <PerformanceStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <PerformanceStack.Screen name="Performance" component={Performance} />
      <PerformanceStack.Screen name="HealthSquad" component={HealthSquad} />
      <PerformanceStack.Screen name="StatusPage" component={StatusPage} />
      <PerformanceStack.Screen name="Success" component={SuccessPage} />
    </PerformanceStack.Navigator>
  );
}

function RecipeStackScreen() {
  return (
    <RecipeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RecipeStack.Screen name="Recipes" component={Recipes} />
      <RecipeStack.Screen name="RecipePage" component={RecipePage} />
    </RecipeStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
      <ProfileStack.Screen name="SetNamePage" component={SetNamePage} />
      <ProfileStack.Screen name="SetPhonePage" component={SetPhonePage} />
      <ProfileStack.Screen
        name="SetBirthDatePage"
        component={SetBirthDatePage}
      />
      <ProfileStack.Screen name="SuccessPage" component={SuccessPage} />
    </ProfileStack.Navigator>
  );
}

type TabIconProps = {
  icon: ImageSourcePropType
  focused: boolean
}

const TabIcon = ({focused, icon}: TabIconProps) => {
  return (
    <View style={{
      borderTopWidth: focused ? 2 : 0,
      borderColor: focused ? "#7265E3" : "transparent",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
    }}>
      <Image source={icon} resizeMode="contain" style={{width: '70%', height: '70%'}} />
    </View>
  )
}
  

export default function TabRoutes() {
  const heightSize = Platform.OS === "ios" ? 90 : 60;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#EDF1F7",
          height: '10%'
         },
        tabBarInactiveTintColor: "#7265E3",
        tabBarActiveTintColor: "#41379A",
        tabBarShowLabel: false,
      }}
      initialRouteName="home"
    >
      <Tab.Screen
        name="home"
        component={HomeStackScreen}
        options={{ tabBarIcon: ({focused}) => <TabIcon icon={ focused ? HomeIconSolid : HomeIcon } focused={focused} /> }}
      />
      <Tab.Screen
        name="diary"
        component={DiaryStackScreen}
        options={{ tabBarIcon: ({focused}) => (<TabIcon icon={focused ? DiaryIconSolid : DiaryIcon} focused={focused} />) }}
      />
      <Tab.Screen
        name="performance"
        component={PerformanceStackScreen}
        options={{ tabBarIcon: ({focused}) => <TabIcon icon={focused ? ExamsIconSolid : ExamsIcon} focused={focused} /> }}
      />
      <Tab.Screen
        name="recipes"
        component={RecipeStackScreen}
        options={{ tabBarIcon: ({focused}) => <TabIcon icon={focused ? RecipesIconSolid : RecipesIcon} focused={focused} /> }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileStackScreen}
        options={{ tabBarIcon: ({focused}) => <TabIcon icon={focused ? ProfileIconSolid : ProfileIcon} focused={focused} /> }}
      />
    </Tab.Navigator>
  );
}
