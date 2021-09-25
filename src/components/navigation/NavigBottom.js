import React from 'react';

import { View, TouchableHighlight} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Colors} from '../../styles/index'
import { EventRegister } from 'react-native-event-listeners'

import HomeScreen from '../screens/homeScreen';
import HeadsetScreen from '../screens/headsetScreen';
import DevicesScreen from '../screens/devicesScreen';
import SettingsScreen from '../screens/settingsScreen';
import { BottomPopup } from '../sliders/BottomPopup';

let popuplist = []

EventRegister.addEventListener('tact-device-update', (args) => {
    console.log('baptics Devices Found')
    if(!(popuplist.some( arg => arg['addr'] === args.addr ))) {
        popuplist.push(args)
    } else {
        let index = popuplist.findIndex(x => x.addr ===args.addr)
        popuplist[index] = args
    }
    onUpdate
})

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

let popupRef = React.createRef()

const onShowPopup = () => {
    popupRef.show()
}

const onClosePopup = () => {
    popupRef.close()
}

const onUpdate = () => {
    popupRef.refresh()
}

function MyTabs() {

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
                } else if (route.name === 'Devices') {
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
            <Tab.Screen name="Devices" component={DevicesScreen}/>
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
    headerTintColor: Colors.WHITE,
    headerTitleAlign:'center',
    headerStyle: {
        backgroundColor: Colors.GRAY_LIGHT,
        elevation: 0,
        shadowOpacity: 0,
    }
}
