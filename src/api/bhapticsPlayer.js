import BleManager from 'react-native-ble-manager';
import {NativeModules, NativeEventEmitter, } from 'react-native';
import { EventRegister } from 'react-native-event-listeners'
const { BhapticModuleJava } = NativeModules;
const tact = require('./tact')

export default class bhapticsPlayer {
    constructor() {
        this.list = []
        this.hapticsConnectionState = false
    }
    launch() {
        tact
            .onFileLoaded((file) => {
                EventRegister.emit('tact-device-fileLoaded', file)
            })
            .onUpdateDevices((message) => {
                this.hapticsConnectionState = false
                EventRegister.emit('tact-device-update', message)
            })
            .onConnected(() => {
                this.hapticsConnectionState = true
                EventRegister.emit('tact-device-connected', {})
            })
            .onDisconnected(() => {
                this.hapticsConnectionState = false
                EventRegister.emit('tact-device-disconnected', {})
            })
    }

    getHapticList() {
        BhapticModuleJava.getHapticList();
    }
}
