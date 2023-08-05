/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
  NativeModules,
  PermissionsAndroid,
} from 'react-native'
import {
  requestReadSMSPermission,
  startReadSMS,
} from 'react-native-sms-receiver/Receiver'

const DirectSms = NativeModules.DirectSms

const App = () => {
  const startReadingMessages = async () => {
    const hasPermission = await requestReadSMSPermission()
    if (hasPermission) {
      startReadSMS((status, sms, error) => {
        if (status == 'success') {
          console.log('Great 🤠 !! you have received new sms:', sms)
        }
      })
    }
  }

  useEffect(() => {
    startReadingMessages()
  }, [])

  const send = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          title: 'YourProject App Sms Permission',
          message:
            'YourProject App needs access to your inbox ' +
            'so you can send messages in background.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        DirectSms.sendDirectSms(
          '09351112222',
          'This is a direct message',
          trace => console.log({trace}),
        )
      } else {
        console.error('SMS permission denied')
      }
      return {granted}
    } catch (err) {
      console.warn(err)
    }
  }

  const sendSample = () => {
    send()
      .then(ok => console.log({ok}))
      .catch(ng => console.log({ng}))
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Button title="Send" onPress={() => sendSample()} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default App
