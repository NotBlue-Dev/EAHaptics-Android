
const oui = require('oui')

class IpFinder {

    findIp(type) {
        return new Promise((resolve, reject) => {
            if(type === '') {
                reject('cancel')
                return
            }

            const normalizedType = type.toLowerCase()
            if(normalizedType !== 'quest') {
                resolve('localhost')
                return;
            }

            setTimeout(() => {
                reject('timeout')
            }, 10000)

            find().then(devices => {
                devices.forEach(data => {
                    this.validate(data.ip).then(() => {
                        resolve(data.ip)
                    }).catch(() => {})
                });
            })                   
        })
    }

    validate(ip) {
        return new Promise((resolve, reject) => {
            if(ip === 'localhost') resolve()
            if(ip === "") reject()
            arp.getMAC(ip, (err, mac) => {
                console.log('AAAAAAAAARPPPPPPPPPPPP')
                if (err) {
                    reject()
                    return;
                }
                try {
                    let a = oui(mac)
                    if (a.split(' ')[0] === 'Oculus') {
                        resolve()
                    }
                } catch {
                    reject()
                }
            })
        })
    }
}

module.exports = IpFinder
