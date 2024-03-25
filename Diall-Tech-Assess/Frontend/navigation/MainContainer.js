import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createStackNavigator } from '@react-navigation/stack';

//Screens
// import HomePage from './pages/HomePage';
import WatchPage from './pages/WatchPage';
import SearchPage from './pages/SearchPage';
import AskPage from './pages/AskPage';

//Screen Names
// const homepageName = 'Home';
const watchpageName = 'Watch';
const searchpageName = 'Search';
const askpageName = 'Ask';

//Create the Tab Navigator
const Tab = createBottomTabNavigator();
export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={watchpageName}
            screenOptions ={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    // if (rn === homepageName) {
                    //     iconName = focused ? 'home' : 'home-outline'
                    if (rn === watchpageName){
                        iconName = focused ? 'videocam' : 'videocam-outline'
                    } else if (rn === searchpageName){
                        iconName = focused ? 'search' : 'search-outline'
                    } else if (rn === askpageName){
                        iconName = focused ? 'help-circle' : 'help-circle-outline'
                    }

                    return <Ionicons name={iconName} size ={size} color={color} />
                    
                }
            })}>
            {/* <Tab.Screen
                name="Home"
                component={HomePage}
            /> */}
            <Tab.Screen
                name="Watch"
                component={WatchPage}
            />
            <Tab.Screen
                name="Search"
                component={SearchPage}
            />
            <Tab.Screen
                name="Ask"
                component={AskPage}
            />            

            </Tab.Navigator>
        </NavigationContainer>
    )
}