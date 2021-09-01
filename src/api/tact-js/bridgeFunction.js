import { DeviceEventEmitter } from 'react-native';
import {NativeModules, } from 'react-native';
const { BhapticModuleJava } = NativeModules;

class bridgeFunction {

    submitFile(key,intensity,duration) {
        BhapticModuleJava.BhapticSubmit(key,intensity,duration)
    }

    registerFile(key,content) {
        BhapticModuleJava.BhapticregisterFile(key,content)
    }
}

module.exports = new bridgeFunction()
