import BleManager from 'react-native-ble-manager';
import {NativeModules, NativeEventEmitter, } from 'react-native';
import { EventRegister } from 'react-native-event-listeners'
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const { BhapticModuleJava } = NativeModules;


export default class bhapticsPlayer {
    constructor() {
        this.list = []
    }
    
    launch() {
        
    }

    refresh() {
        BhapticModuleJava.getHapticList((a) => {
        
            this.list.length = 0

            if(a == '[]') {
                console.log('No Device Found')
            } else {
                let data = []
                let liste = this.list;
                //format oui c'est le bordel et y'avais plus simple a faire mais j'ai fais ca a 5h du math
                let string = a.replace(/.BhapticsDevice\s/, '').split(']')[0]
                let value = string.match(/\:.+?\,/g)
                let status = string.match(/(\ [a-zA-Z]+)}/g)
                
                value.forEach(element => {
                    let news = element.split(/(: )|[, ]+/gm)[2]
                    data.push(news)
                });
                
                function update() {
                    let obj = {
                        "addr":data[0],
                        "name": data[1],
                        "type":data[2],
                        "battery":data[3],
                        "paired":data[4],
                        "status":status[0].slice(1,-1)
                    }
    
                    value.splice(0,5)
                    status.splice(0,1)
                    liste.push(obj)
                    if(value.length>=5) update()
                }
    
                update()

                EventRegister.emit('onUpdateList', this.list)
                
            }
        })  
    }

    // update() {

    // }
}
