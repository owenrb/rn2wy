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
  NativeModules,
  PermissionsAndroid,
} from 'react-native'
import {
  requestReadSMSPermission,
  startReadSMS,
} from 'react-native-sms-receiver/Receiver'
import {Button} from 'react-native-paper'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import InboundScreen from './screen/inbound.screen'
import OutboundScreen from './screen/outbound.screen'
import SettingScreen from './screen/settings.screen'

const Tab = createBottomTabNavigator()

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
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Inbound"
          component={InboundScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="inbox-arrow-down"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Outbound"
          component={OutboundScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="inbox-arrow-up"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})

export default App
