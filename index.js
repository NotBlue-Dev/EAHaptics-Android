/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { EventRegister } from 'react-native-event-listeners'

const EchoLib = require('echomodlib')
const ipFinder = require('./src/api/ipFinder')
const BHapticsTactJsAdapter = require('./src/api/tact')
const ConfigLoader = require('./src/api/configLoader')

const sendEvent = (channel, args) => {
    EventRegister.emit(channel, args)
}

const listenEvent = (channel, callable) => {
    EventRegister.on(channel, callable)
}

let config = new ConfigLoader(sendEvent)

listenEvent('configReady', () => {
    const player = new EchoLib.TactPlayer(
        new BHapticsTactJsAdapter(),
        new ipFinder(),
        config,
        sendEvent,
        listenEvent
    )
    player.launch()
})


AppRegistry.registerComponent(appName, () => App);
