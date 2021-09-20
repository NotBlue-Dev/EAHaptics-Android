import {NativeModules, } from 'react-native';
const { BhapticModuleJava } = NativeModules;
import { DeviceEventEmitter } from 'react-native';
const bridgeFunction = require('../api/tact-js/bridgeFunction')
import { TactFiles } from '../styles/index';
class BHapticsTactJsAdapter {
    constructor() {
        this.connected = false
        this.handleFileLoaded = () => {}
        this.handleConnecting = () => {}
        this.handleConnected = () => {}
        this.handleDisconnected = () => {}
        this.handleUpdateDevices = () => {}
        this.initialize()
     }

    onFileLoaded(callback) {
        this.handleFileLoaded = callback
        return this
    }

    onUpdateDevices(callback) {
        this.handleUpdateDevices = callback
        return this
    }

    onConnecting(callback) {
        this.handleConnecting = callback
        return this
    }

    onConnected(callback) {
        this.handleConnected = callback
        return this
    }

    onDisconnected(callback) {
        this.handleDisconnected = callback
        return this
    }

    connect() {
        BhapticModuleJava.connectBhapticsDevice()
    }

    initialize() {
        DeviceEventEmitter.addListener('onUpdateDevices',((message) => {
            this.handleUpdateDevices(message)
            console.log('update')
            this.connect()
        }))
        DeviceEventEmitter.addListener('onDisconnect',((message) => {
            this.connected = false
            this.handleDisconnected()
        }))
        DeviceEventEmitter.addListener('onConnect',((message) => {
            this.connected = true
            this.handleConnected()
            this.loadTactFiles()
        }))
    }

    playEffect(name, options) {
        console.log('play ', name)
        BhapticModuleJava.BhapticSubmit(name,options.intensity,options.duration)
    }

    loadTactFiles() {
        for(let key in TactFiles){
            bridgeFunction.registerFile(key,JSON.stringify(TactFiles[key]))
            this.handleFileLoaded(key)
        }
    }
}

module.exports = BHapticsTactJsAdapter
