import { StatusBar } from 'expo-status-bar';
import React, { useState }  from 'react';
import {  Button, SafeAreaView, Alert ,StyleSheet, TextInput, Text, View, FlatList } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homes from './rooms/Home';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);
var db = firebase.database();


const HomeScreen = ({ navigation }) => {
  let [roomCode, setRoomCode] = useState('');
  let [user, setUser] = useState('');
  return (
    <View style={styles.container}>
      <View style={{padding: 10}}>
      
      <TextInput
        style={{height: 40}}
        placeholder="Room code"
        onChangeText={roomCode => setRoomCode(roomCode)}
        defaultValue={roomCode}
      />
      
    </View>
    <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}
        placeholder="Your Name"
        onChangeText={user => setUser(user)}
        defaultValue={user}
      />
      
    </View>
    <Button
      title="Create Room"
      onPress={() =>{
        navigation.navigate('Profile', { roomCode : roomCode, name: user })}}
    />
  <Button
      title="Join"
      onPress={() =>
        navigation.navigate('Profile', { name: 'Jane' })
      }
    />
    
    </View>
  );
};


const ProfileScreen = ({ navigation, route }) => {
  var members = [];
  var i=0;
  members.push(
    <View key={++i}>
      <Text>{route.params.name}</Text>
    </View>
  );
  return (<View>
    
    <Text>Room Code : {route.params.roomCode}</Text>
    <Text>Members : </Text>
    <View>
      {members}
    </View>
    
      {/* <text>{route.params.name}</text> */}
    
  
  </View>);
};

const Stack = createStackNavigator();

const Separator = () => (
  <View style={styles.separator} />
);

export default function App() {
  const [text, setText] = useState('');
  return (
    <NavigationContainer>
      {/*navigation */}
    <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />

        </Stack.Navigator>

  
    
    
      
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


