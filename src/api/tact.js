
import { DeviceEventEmitter } from 'react-native';
import {NativeModules, } from 'react-native';
const { BhapticModuleJava } = NativeModules;
const bridgeFunction = require('../api/tact-js/bridgeFunction')

class Tact {
    constructor() {
        this.connected = false
        this.handleFileLoaded = () => {}
        this.handleConnected = () => {}
        this.handleDisconnected = () => {}
        this.handleUpdateDevices = () => {}
        this.initialize()
     }
     
    onFileLoaded(callback) {
        this.handleFileLoaded = callback
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

    onUpdateDevices(callback) {
        this.handleUpdateDevices = callback
        return this
    }

    connect() {
        BhapticModuleJava.connectBhapticsDevice()
    }

    initialize() {
        DeviceEventEmitter.addListener('onUpdateDevices',((message) => {
            this.handleUpdateDevices(message)
            this.connect()
        }))
        DeviceEventEmitter.addListener('onDisconnect',((message) => {
            this.connected = false
            this.handleDisconnected()
        }))
        DeviceEventEmitter.addListener('onConnect',((message) => {
            this.connected = true
            this.handleConnected()
            // this.loadTactFiles()
        }))
    }

    loadTactFiles() {
        fs.readdir(__dirname + '/../../assets', {}, (err, files) => {
            files.filter((file) => {
                return file.match(/([A-z]+).tact$/g) !== null
            }).forEach((value) => {
                bridgeFunction.registerFile(value.split('.')[0],fs.readFileSync((__dirname + `/../../assets/${value}`), 'utf8'))
                this.handleFileLoaded(value)
            })
        })
    }
}

module.exports = new Tact()
