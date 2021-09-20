const path = require('path');

import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../../config.json'
import defaultConfig from '../assets/default.json'

class ConfigLoader {
    constructor(sendEvent) {
        this.sendEvent = sendEvent
        this.config = config
        this.defaultConfig = defaultConfig
        this.def = null
        this.conf = null
        this.init()
    }

    loadDefault() {
      return this.def
    }

    load() {
        return {
            ip: null,
            effects: {
                ...this.def
            },
            ...this.conf
        }
    }

    async loadJsonFile(key) {
      try {
        const value = await AsyncStorage.getItem(key)
        if(value !== null) {
          return await JSON.parse(value)
        } else {
          return {}
        }
      } catch(err) {
      }
    }

    async save(config, callback) {
      try {
        await AsyncStorage.setItem(
          'config',
          JSON.stringify(config)
        );
      } catch (err) {
      }
    }

    async init() {
      try {
        const value = await AsyncStorage.getItem('config')
        if(value === null) {
          await AsyncStorage.setItem('config', JSON.stringify(this.config))
        }
        await AsyncStorage.setItem('default', JSON.stringify(this.defaultConfig))
        this.def = await this.loadJsonFile('default')
        this.conf = await this.loadJsonFile('config')
        this.sendEvent('configReady')
      } catch(err) {
        console.log(err)
      }
    }
}

module.exports = ConfigLoader
