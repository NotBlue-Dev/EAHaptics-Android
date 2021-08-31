import React from 'react';

import { View, TouchableHighlight, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Colors} from '../../styles/index'

import HomeScreen from '../screens/homeScreen';
import HeadsetScreen from '../screens/headsetScreen';
import ScanScreen from '../screens/scanScreen';
import SettingsScreen from '../screens/settingsScreen';
import { BottomPopup } from '../sliders/BottomPopup';

const popuplist = [
    {
        id:1,
        name: 'Test'
    },
    {
        id:2,
        name: 'Test2'
    },
    {
        id:3,
        name: 'Test3'
    }
]

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
    let popupRef = React.createRef()

    const onShowPopup = () => {
        popupRef.show()
    }

    const onClosePopup = () => {
        popupRef.close()
    }

    return(
        <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
            headerLeft:() => (
                <View>
                    <TouchableHighlight activeOpacity={1} underlayColor={Colors.GRAY_LIGHT} onPress={onShowPopup}>
                        <Ionicons name={'list-outline'} size={25} color={Colors.WHITE} style={{paddingLeft: 25}}/>
                    </TouchableHighlight>
                    <BottomPopup
                        title="Devices List"
                        ref = {(target) => popupRef = target}
                        onTouchOutside={onClosePopup}
                        data={popuplist}
                    />
                </View>
            ),

            headerRight:() => (
                <TouchableHighlight activeOpacity={1} underlayColor={Colors.GRAY_LIGHT} onPress={()=>navigation.navigate('Settings')}>
                    <View>
                        <Ionicons name={'settings-outline'} size={25} color={Colors.WHITE} style={{paddingRight: 25}}/>
                    </View>
                </TouchableHighlight>
            ),

            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused ? 'home': 'home-outline';
                } else if (route.name === 'Scan') {
                    iconName = focused ? 'scan' : 'scan-outline';
                } else if (route.name === 'Headset') {
                    iconName = focused ? 'game-controller' : 'game-controller-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },

            tabBarActiveTintColor: Colors.LIGHT_BLUE,
            tabBarInactiveTintColor: Colors.WHITE,
            tabBarActiveBackgroundColor: Colors.GRAY_DARK,
            tabBarInactiveBackgroundColor: Colors.GRAY_DARK,
            tabBarStyle: {
                paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                height: 60,
                paddingBottom:6,
                backgroundColor: Colors.GRAY_DARK,
                borderTopWidth: 0
            },

            headerTitle:'EAHaptics',
            headerTintColor: Colors.WHITE,
            headerTitleAlign:'center',
            headerStyle: {
                backgroundColor: Colors.GRAY_LIGHT,
                elevation: 0,
                shadowOpacity: 0,
            },

            })
        }>
            <Tab.Screen name="Scan" component={ScanScreen}/>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Headset" component={HeadsetScreen}/>
        </Tab.Navigator>
    )
}

export default function NavigBottom(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Tabs" options={{headerShown:false}} component={MyTabs} />
            <Stack.Screen name="Settings" options={opt} component={SettingsScreen}/>
        </Stack.Navigator>
    )
}


const opt = {
    headerTitle:'EAHaptics',
    headerTintColor: Colors.WHITE,
    headerTitleAlign:'center',
    headerStyle: {
        backgroundColor: Colors.GRAY_LIGHT,
        elevation: 0,
        shadowOpacity: 0,
    }
}
