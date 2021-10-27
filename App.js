/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import { Container, Header, Left } from 'native-base';
import React,{useState} from 'react';
// import  {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Switch
  
} from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';
import ToggleSwitch from 'toggle-switch-react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';





import Home from './Pages/Home';




const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  

  return (
    <NavigationContainer  >
    <Drawer.Navigator initialRouteName="Home">
      
    
  
     
      <Drawer.Screen name="Home" component={Home} />
  
     
    </Drawer.Navigator>
  </NavigationContainer>
   
   
    
  );
};

const styles = StyleSheet.create({
  headerstyle:{
    backgroundColor:'#fff'
  },
  upperContainer: {
    backgroundColor:'#01070f',
    color:'#fff',
   
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
