import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Workout from './screens/Workout';
import List from './screens/List';
import Settings from './screens/Settings';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

/*
TODO: 
SETTINGS NAPPULA NAVIGAATIOON
KILOMETRIT MAILEIKSI JA PÄINVASTOIN
*/
const Tab = createBottomTabNavigator();

const App = () => {
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;
      if (route.name === 'Home') {
        iconName = 'home';
      } else if (route.name === 'Workout') {
        iconName = 'dumbbell';
      } else if (route.name === 'List of workouts') {
        iconName = 'format-list-bulleted';
      } else if (route.name === 'Settings') {
        iconName = 'cog';
      }
      return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#FEFF9F',
    tabBarInactiveTintColor: '#55570e',
    tabBarStyle: { height: 80, backgroundColor: '#72BF78', paddingBottom: 5 },
    tabBarLabelStyle: { fontSize: 16, color: 'white' },
  });

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Workout" component={Workout} />
        <Tab.Screen name="List of workouts" component={List} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
