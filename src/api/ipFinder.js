import {NativeModules} from 'react-native';
const oui = require('oui')
const { BhapticModuleJava } = NativeModules;

class IpFinder {

    findIp() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('timeout')
            }, 10000)

            for(let i = 1; i<254; i++) {
                this.validate(`192.168.1.${i}`).then(() => {
                    resolve(`192.168.1.${i}`)
                    console.log(i)
                }).catch(() => {})      
            }
        })
    }

    validate(ip) {
        return new Promise((resolve, reject) => {
            BhapticModuleJava.getMacAddress(ip, (mac) => {
                
                try {
                    let a = oui(mac)
                    if (a.split(' ')[0] === 'Oculus') {
                        resolve()
                        return;
                    }
                } catch {
                    reject()
                }
            })
        })
    }
}

module.exports = IpFinder
